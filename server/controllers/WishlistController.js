const WishlistModel = require("../models/WishlistModel");

const populateWishlist = (query) => query.populate(
  "items.product_id",
  "name thumbnail final_price"
);

function normalizeItems(items = []) {
  const unique = new Map();

  for (const item of Array.isArray(items) ? items : []) {
    const productId = item?.product_id?._id || item?.product_id || item?.id || item?._id;
    if (productId) unique.set(String(productId), { product_id: productId });
  }

  return [...unique.values()];
}

async function fetchWishlist(userId) {
  return populateWishlist(WishlistModel.findOne({ user_id: userId }));
}

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user?._id || req.params.user_id;
    if (!userId) return res.send({ flag: 1, wishlist: { items: [] } });

    const wishlist = await fetchWishlist(userId);
    return res.send({ flag: 1, wishlist: wishlist || { items: [] } });
  } catch (error) {
    console.error("Get wishlist failed", error);
    return res.send({ flag: 0, msg: "Failed to fetch wishlist" });
  }
};

// The only endpoint that merges guest storage into an authenticated wishlist.
exports.mergeWishlist = async (req, res) => {
  try {
    const { user_id, items, merge_token } = req.body;
    if (!user_id || !merge_token) {
      return res.send({ flag: 0, msg: "user_id and merge_token are required" });
    }

    const guestItems = normalizeItems(items);
    let existingWishlist = await WishlistModel.findOne({ user_id });

    if (existingWishlist?.guest_merge_token === merge_token) {
      return res.send({
        flag: 1,
        msg: "Guest wishlist already merged",
        wishlist: await fetchWishlist(user_id),
      });
    }

    if (!existingWishlist) {
      try {
        const created = await WishlistModel.create({
          user_id,
          items: guestItems,
          guest_merge_token: merge_token,
        });
        return res.send({
          flag: 1,
          msg: "Guest wishlist merged successfully",
          wishlist: await populateWishlist(created),
        });
      } catch (error) {
        // A concurrent request created the unique user wishlist. Continue guarded.
        if (error?.code !== 11000) throw error;
        existingWishlist = await WishlistModel.findOne({ user_id });
      }
    }

    const mergedItems = normalizeItems([...existingWishlist.items, ...guestItems]);
    const wishlist = await populateWishlist(WishlistModel.findOneAndUpdate(
      { _id: existingWishlist._id, guest_merge_token: { $ne: merge_token } },
      { $set: { items: mergedItems, guest_merge_token: merge_token } },
      { new: true, runValidators: true }
    ));

    return res.send({
      flag: 1,
      msg: "Guest wishlist merged successfully",
      wishlist: wishlist || await fetchWishlist(user_id),
    });
  } catch (error) {
    console.error("Guest wishlist merge failed", error);
    return res.send({ flag: 0, msg: "Wishlist merge failed" });
  }
};

// The only endpoint used to persist authenticated Redux changes, including clear.
exports.updateWishlist = async (req, res) => {
  try {
    const { user_id, items } = req.body;
    if (!user_id) return res.send({ flag: 0, msg: "user_id required" });

    const wishlist = await populateWishlist(WishlistModel.findOneAndUpdate(
      { user_id },
      { $set: { items: normalizeItems(items) } },
      { upsert: true, new: true, runValidators: true }
    ));

    return res.send({ flag: 1, msg: "Wishlist updated", wishlist });
  } catch (error) {
    console.error("Wishlist update failed", error);
    return res.send({ flag: 0, msg: "Wishlist update failed" });
  }
};

// Kept as a compatibility endpoint; all client writes use /wishlist/update.
exports.clearWishlist = async (req, res) => {
  req.body.items = [];
  return exports.updateWishlist(req, res);
};
