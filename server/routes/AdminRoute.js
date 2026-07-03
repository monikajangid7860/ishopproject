const express = require("express");
const { verifyAdmin, verifySuperAdmin } = require("../middleware/adminauth");


const router = express.Router();

const AdminNotification = require("../models/AdminNotificationModel");


/* 🔔 GET ADMIN NOTIFICATIONS */
router.get("/notifications", async (req, res) => {
  const notifications = await AdminNotification.find()
    .sort({ createdAt: -1 })
    .limit(20);

  const unreadCount = await AdminNotification.countDocuments({
    isRead: false,
  });

  res.json({
    flag: 1,
    notifications,
    unreadCount,
  });
});




/* ================= ADMIN ONLY ================= */

// Test route
router.get("/me", verifyAdmin, (req, res) => {
  res.json({
    flag: 1,
    admin: req.session.admin,
  });
});


// Admin dashboard access
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({
    flag: 1,
    msg: "Admin dashboard access granted",
  });
});

/* ================= SUPER ADMIN ONLY ================= */

// Create new admin (future)
router.post("/create-admin", verifySuperAdmin, (req, res) => {
  res.json({
    flag: 1,
    msg: "SuperAdmin can create new admin",
  });
});

module.exports = router;
