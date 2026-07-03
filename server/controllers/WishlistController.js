// controllers/wishlist.controller.js
const WishlistModel = require("../models/WishlistModel");

exports.getWishlist = async (req, res) => {
  try {
    const user_id = req.user?._id || req.params.user_id;

    if (!user_id) {
      return res.send({ flag: 1, wishlist: { items: [] } });
    }

    const wishlist = await WishlistModel
      .findOne({ user_id })
      .populate("items.product_id", "name thumbnail final_price");

    res.send({
      flag: 1,
      wishlist: wishlist || { items: [] },
    });
  } catch (err) {
    console.error(err);
    res.send({ flag: 0, msg: "Failed to fetch wishlist" });
  }
};

exports.mergeWishlist = async (req, res) => {
  try {
    const { user_id, items = [] } = req.body;

    if (!user_id) {
      return res.send({ flag: 0, msg: "user_id required" });
    }

    const dbWishlist = await WishlistModel.findOne({ user_id });
    const map = new Map();

    // DB items first
    dbWishlist?.items.forEach((item) => {
      map.set(String(item.product_id), item);
    });

    // Guest items (safe)
    if (Array.isArray(items)) {
      items.forEach((item) => {
        const key = String(item.product_id || item.id);
        map.set(key, { product_id: key });
      });
    }

    const mergedItems = Array.from(map.values());

    const wishlist = await WishlistModel.findOneAndUpdate(
      { user_id },
      { items: mergedItems },
      { upsert: true, new: true }
    ).populate("items.product_id");

    res.send({ flag: 1, wishlist });
  } catch (err) {
    console.error(err);
    res.send({ flag: 0, msg: "Wishlist merge failed" });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    if (!user_id) {
      return res.send({ flag: 0, msg: "user_id required" });
    }

    // 🛑 HARD BLOCK — NEVER ALLOW EMPTY OVERWRITE
    if (!Array.isArray(items) || items.length === 0) {
      const existing = await WishlistModel.findOne({ user_id });
      return res.send({
        flag: 1,
        msg: "Empty update ignored",
        wishlist: existing || { items: [] },
      });
    }

    const normalizedItems = Array.isArray(items)
  ? items.map((item) => ({
      product_id: item.product_id || item.id,
    }))
  : [];

const wishlist = await WishlistModel.findOneAndUpdate(
  { user_id },
  { items: normalizedItems },
  { upsert: true, new: true }
).populate("items.product_id");

return res.send({ flag: 1, wishlist });

  } catch (err) {
    console.error(err);
    res.send({ flag: 0, msg: "Wishlist update failed" });
  }
};




exports.syncWishlist = async (req, res) => {
  console.log("🔥 SYNC WISHLIST CALLED", req.body.items);
    console.log("🚨 HIT /wishlist/sync ROUTE");

  try {
    const user_id = req.user?._id || req.body.user_id;
    const items = req.body.items;

    if (!user_id) {
      return res.send({ flag: 0, msg: "user_id required" });
    }

    // 🔐 BLOCK EMPTY SYNC
    if (!Array.isArray(items) || items.length === 0) {
      const existing = await WishlistModel.findOne({ user_id }).populate(
        "items.product_id"
      );

      return res.send({
        flag: 1,
        wishlist: existing || { items: [] },
      });
    }

    const uniqueMap = new Map();

    items.forEach((item) => {
      const key = String(item.product_id || item.id);
      uniqueMap.set(key, { product_id: key });
    });

    const normalizedItems = Array.from(uniqueMap.values());

    const wishlist = await WishlistModel.findOneAndUpdate(
      { user_id },
      { items: normalizedItems },
      { upsert: true, new: true }
    ).populate("items.product_id");

    res.send({ flag: 1, wishlist });
  } catch (err) {
    console.error(err);
    res.send({ flag: 0, msg: "Wishlist sync failed" });
  }
};

// CLEAR WISHLIST — EXPLICIT
exports.clearWishlist = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.send({ flag: 0, msg: "user_id required" });
    }

    const wishlist = await WishlistModel.findOneAndUpdate(
      { user_id },
      { items: [] },
      { new: true }
    );

    res.send({ flag: 1, wishlist });
  } catch (err) {
    console.error(err);
    res.send({ flag: 0, msg: "Clear wishlist failed" });
  }
};
