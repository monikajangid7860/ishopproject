const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");

/* ==============================
   PRIVATE
============================== */

async function findOrCreateCart(userId) {
  let cart = await CartModel.findOne({ user_id: userId });

  if (!cart) {
    cart = await CartModel.create({
      user_id: userId,
      items: [],
    });
  }

  return cart;
}

async function getPopulatedCart(userId) {
  return await CartModel.findOne({ user_id: userId }).populate(
    "items.product_id",
    "name thumbnail final_price original_price stock status"
  );
}

/* ==============================
   PUBLIC
============================== */

async function getCart(userId) {
  return await getPopulatedCart(userId);
}

async function addItem(userId, productId) {
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (!product.status) {
    throw new Error("Product unavailable");
  }

  if (!product.stock) {
    throw new Error("Product out of stock");
  }

  const cart = await findOrCreateCart(userId);

  const existing = cart.items.find(
    (i) => String(i.product_id) === String(productId)
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({
      product_id: product._id,
      quantity: 1,
      price_snapshot: product.final_price,
    });
  }

  await cart.save();

  return await getPopulatedCart(userId);
}

async function removeItem(userId, productId) {
  const cart = await findOrCreateCart(userId);

  const item = cart.items.find(
    (i) => String(i.product_id) === String(productId)
  );

  if (!item) {
    return await getPopulatedCart(userId);
  }

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart.items = cart.items.filter(
      (i) => String(i.product_id) !== String(productId)
    );
  }

  await cart.save();

  return await getPopulatedCart(userId);
}

async function updateQuantity(userId, productId, quantity) {
  const cart = await findOrCreateCart(userId);

  const item = cart.items.find(
    (i) => String(i.product_id) === String(productId)
  );

  if (!item) {
    throw new Error("Item not found");
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (i) => String(i.product_id) !== String(productId)
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save();

  return await getPopulatedCart(userId);
}

module.exports = {
  getCart,
  addItem,
  removeItem,
  updateQuantity,
};