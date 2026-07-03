const express = require("express");
const { syncCart, getCart,updateCart } = require("../controllers/CartController");


const CartRouter = express.Router();

/* -------------------------------
   CART ROUTES
-------------------------------- */
CartRouter.post("/sync-cart",  syncCart);
CartRouter.get("/:id",  getCart);
CartRouter.post("/update",  updateCart);

module.exports = CartRouter;
