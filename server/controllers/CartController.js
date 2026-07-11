const messages = require("../message");
const CartModel = require("../models/CartModel");

const populateCart = (query) => query.populate(
  "items.product_id",
  "name final_price original_price thumbnail"
);

function normalizeItems(items = []) {
  const merged = new Map();

  for (const item of Array.isArray(items) ? items : []) {
    const productId = item?.product_id?._id || item?.product_id || item?.id || item?._id;
    if (!productId) continue;

    const key = String(productId);
    const quantity = Math.max(1, Number(item.quantity || item.qty || 1));
    const existing = merged.get(key);
    merged.set(key, {
      product_id: productId,
      quantity: existing ? existing.quantity + quantity : quantity,
      price_snapshot: item.price_snapshot ?? item.price ?? item.final_price ?? null,
    });
  }

  return [...merged.values()];
}

function mergeItems(dbItems = [], guestItems = []) {
  return normalizeItems([...dbItems, ...guestItems]);
}

async function fetchCart(userId) {
  return populateCart(CartModel.findOne({ user_id: userId }));
}

// The only endpoint that merges guest storage into an authenticated cart.
const syncCart = async (req, res) => {
  try {
    const { user_id, cart_data, source, merge_token } = req.body;
    if (!user_id || source !== "guest" || !merge_token) {
      return res.send({ flag: 0, msg: "user_id, guest source, and merge_token are required" });
    }

    const guestItems = normalizeItems(cart_data);
    let existingCart = await CartModel.findOne({ user_id });

    if (existingCart?.guest_merge_token === merge_token) {
      return res.send({ flag: 1, msg: "Guest cart already merged", cart: await fetchCart(user_id) });
    }

    if (!existingCart) {
      try {
        const created = await CartModel.create({
          user_id,
          items: guestItems,
          guest_merge_token: merge_token,
        });
        return res.send({ flag: 1, msg: "Guest cart merged successfully", cart: await populateCart(created) });
      } catch (error) {
        // A concurrent request created the single user cart. Continue through the guarded update.
        if (error?.code !== 11000) throw error;
        existingCart = await CartModel.findOne({ user_id });
      }
    }

    const mergedItems = mergeItems(existingCart.items, guestItems);
    const updatedCart = await populateCart(CartModel.findOneAndUpdate(
      { _id: existingCart._id, guest_merge_token: { $ne: merge_token } },
      { $set: { items: mergedItems, guest_merge_token: merge_token } },
      { new: true, runValidators: true }
    ));

    // If another identical request won the update, return its authoritative cart.
    return res.send({
      flag: 1,
      msg: "Guest cart merged successfully",
      cart: updatedCart || await fetchCart(user_id),
    });
  } catch (error) {
    console.error("Guest cart merge failed", error);
    return res.send(messages.catch_error);
  }
};

// The only endpoint used to persist authenticated Redux changes.
const updateCart = async (req, res) => {
  try {
    const { user_id, items } = req.body;
    if (!user_id) return res.send({ flag: 0, msg: "user_id is required" });

    const cart = await populateCart(CartModel.findOneAndUpdate(
      { user_id },
      { $set: { items: normalizeItems(items) } },
      { upsert: true, new: true, runValidators: true }
    ));

    return res.send({ flag: 1, msg: "Cart updated", cart });
  } catch (error) {
    console.error("Cart update failed", error);
    return res.send(messages.catch_error);
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await fetchCart(req.params.id);
    return res.send({ flag: 1, cart: cart || { items: [] } });
  } catch (error) {
    console.error("Get cart error", error);
    return res.send(messages.catch_error);
  }
};

module.exports = { syncCart, getCart, updateCart };
