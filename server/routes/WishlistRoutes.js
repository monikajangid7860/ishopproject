const express = require("express");
const {
  getWishlist,
  mergeWishlist,
  updateWishlist,
  clearWishlist,
} = require("../controllers/WishlistController");

const router = express.Router();

router.get("/:user_id", getWishlist);
router.post("/merge", mergeWishlist);
router.post("/update", updateWishlist);
router.post("/clear", clearWishlist); // 🔥 NEW

module.exports = router;
