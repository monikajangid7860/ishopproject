const messages = require("../message");
const CartModel = require("../models/CartModel");

/* ---------------------------------------
   NORMALIZE LOCAL CART (GUEST)
---------------------------------------- */
function normalizeLocalCart(items = []) {
  return items.map((item) => ({
    product_id: String(item.product_id || item.id),
    quantity: Number(item.quantity || item.qty || 1),
    price_snapshot: item.price_snapshot || item.final_price || null,
  }));
}

/* ---------------------------------------
   MERGE CART ITEMS (SAFE)
---------------------------------------- */
function getProductId(item) {
  return String(item.product_id?._id || item.product_id);
}

function mergeCartItems(dbItems = [], localItems = []) {
  const map = new Map();

  // DB cart first
  for (const item of dbItems) {
    const key = getProductId(item);
    map.set(key, {
      product_id: item.product_id?._id || item.product_id,
      quantity: item.quantity,
      price_snapshot: item.price_snapshot,
    });
  }

  // Guest cart
  for (const item of localItems) {
    const key = String(item.product_id);
    if (map.has(key)) {
      map.get(key).quantity += item.quantity;
    } else {
      map.set(key, {
        product_id: item.product_id,
        quantity: item.quantity,
        price_snapshot: item.price_snapshot,
      });
    }
  }

  return Array.from(map.values());
}

/* ---------------------------------------
   SYNC CART (ONLY ON LOGIN)
---------------------------------------- */
const syncCart = async (req, res) => {
  try {
    const { user_id, cart_data, source } = req.body;

    if (!user_id) {
      return res.send({ flag: 0, msg: "user_id is required" });
    }

    const existingCart = await CartModel.findOne({ user_id });

    if (source !== "guest") {
      return res.send({
        flag: 1,
        msg: "Merge skipped",
        cart: existingCart || { items: [] },
      });
    }

    const localCart = normalizeLocalCart(cart_data || []);

    console.log("===== EXISTING DB ITEMS =====");
    console.log(existingCart?.items);

    console.log("===== LOCAL ITEMS =====");
    console.log(localCart);

    const mergedItems = mergeCartItems(
      existingCart?.items || [],
      localCart
    );

    console.log("===== MERGED ITEMS =====");
    console.log(mergedItems);

    const updatedCart = await CartModel.findOneAndUpdate(
      { user_id },
      { items: mergedItems },
      {
        upsert: true,
        new: true,
      }
    ).populate(
      "items.product_id",
      "name final_price original_price thumbnail"
    );

    console.log("===== UPDATED CART =====");
    console.log(updatedCart.items);

    res.send({
      flag: 1,
      msg: "Guest cart merged successfully",
      cart: updatedCart,
    });

  } catch (error) {
    console.error(error);
    res.send(messages.catch_error);
  }
};
  
// const updateCart = async (req, res) => {
//   try {
//     const { user_id, items } = req.body;

//     if (!user_id) {
//       return res.send({ flag: 0, msg: "user_id required" });
//     }

//     await CartModel.findOneAndUpdate(
//       { user_id },
//       { items },
//       { upsert: true }
//     );

//     res.send({
//       flag: 1,
//       msg: "Cart updated",
//     });
//   } catch (err) {
//     console.error("Update cart error", err);
//     res.send(messages.catch_error);
//   }
// };

const updateCart = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    console.log("========== UPDATE CART ==========");
    console.log("USER:", user_id);
    console.log("ITEMS:", JSON.stringify(items, null, 2));

    await CartModel.findOneAndUpdate(
      { user_id },
      { items },
      { upsert: true }
    );

    res.send({
      flag: 1,
      msg: "Cart updated",
    });
  } catch (err) {
    console.error(err);
  }
};
/* ---------------------------------------
   GET CART (REFRESH / PAGE LOAD)
---------------------------------------- */
const getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId)

    if (!userId) {
      return res.send({ flag: 1, cart: { items: [] } });
    }

    const cart = await CartModel.findOne({ user_id: userId }).populate(
      "items.product_id",
      "name final_price original_price thumbnail"
    );

    res.send({
      flag: 1,
      cart: cart || { items: [] },
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.send(messages.catch_error);
  }
};

module.exports = {
  syncCart,
  getCart,
  updateCart,
};
