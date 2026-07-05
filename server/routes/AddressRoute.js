const express = require("express");
const {
  addAddress,
  getAddresses,
  updateAddress,
} = require("../controllers/AddressController");
const { verifyWebsiteUser } = require("../middleware/websiteauth");

const router = express.Router();

router.get("/", verifyWebsiteUser, getAddresses);
router.post("/", addAddress);
router.put("/:addressId", verifyWebsiteUser, updateAddress);

module.exports = router;
