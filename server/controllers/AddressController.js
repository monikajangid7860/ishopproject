const UserModel = require("../models/UserModel");

/* ================= GET ADDRESSES ================= */
exports.getAddresses = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ from session
    console.log("USER ID", userId);
    const user = await UserModel.findById(userId).select("address");
    console.log("USER ADDRESSES", user?.address);
    res.status(200).json({
      flag: 1,
      addresses: user?.address || [],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      flag: 0,
      msg: "Failed to fetch addresses",
    });
  }
};

/* ================= ADD ADDRESS ================= */
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ from session
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        flag: 0,
        msg: "Address is required",
      });
    }

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { address } },
      { new: true }
    );

    res.status(201).json({
      flag: 1,
      msg: "Address added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      flag: 0,
      msg: "Failed to add address",
    });
  }
};

/* ================= UPDATE ADDRESS ================= */
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ from session
    const { addressId } = req.params;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        flag: 0,
        msg: "Address data required",
      });
    }

    const update = {};
    Object.keys(address).forEach((key) => {
      update[`address.$.${key}`] = address[key];
    });

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId, "address._id": addressId },
      { $set: update },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        flag: 0,
        msg: "Address not found",
      });
    }

    res.status(200).json({
      flag: 1,
      msg: "Address updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      flag: 0,
      msg: "Failed to update address",
    });
  }
};
