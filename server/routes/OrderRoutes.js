const express = require("express");
const {
  createOrder,
  getUserOrders,
  verifyPayment, 
  getRecentOrdersForAdmin,
  updateOrderStatus,
} = require("../controllers/OrderController");
const { verifyWebsiteUser } = require("../middleware/websiteauth");
const { verifyAdmin } = require("../middleware/adminauth");


const router = express.Router();

/* 🔐 CREATE ORDER (COD / ONLINE) */
router.post("/create", verifyWebsiteUser, createOrder);

/* 🔐 VERIFY RAZORPAY PAYMENT */
router.post("/verify", verifyWebsiteUser, verifyPayment);

/* 🔐 GET MY ORDERS */
router.get("/", verifyWebsiteUser, getUserOrders);
router.get("/admin/recent",  getRecentOrdersForAdmin);
router.patch("/admin/:id/status", updateOrderStatus);

module.exports = router;
