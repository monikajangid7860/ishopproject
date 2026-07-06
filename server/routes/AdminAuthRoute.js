const express = require("express");
const { adminLogin, adminLogout } = require("../controllers/AdminAuthController");

const {verifyAdmin} = require("../middleware/adminauth");

const router = express.Router();

/* LOGIN */
router.post("/login", adminLogin);

/* LOGOUT */
router.post("/logout", adminLogout);

/* 🔐 CHECK ADMIN SESSION */

router.get("/me", verifyAdmin, (req, res) => {
  res.json({
    flag: 1,
    admin: req.admin,
  });
});


module.exports = router;
