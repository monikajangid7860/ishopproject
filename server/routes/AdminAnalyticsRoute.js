const router = require("express").Router();
const { verifyAdmin } = require("../middleware/adminauth");
const { getDashboardStats } = require("../controllers/AdminAnalyticsController");

router.get("/dashboard", verifyAdmin, getDashboardStats);

module.exports = router;
