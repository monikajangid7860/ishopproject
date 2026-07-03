require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/AdminModel");

async function createSuperAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Check if SUPERADMIN already exists
    const exists = await Admin.findOne({ role: "SUPERADMIN" });

    if (exists) {
      console.log("❌ SuperAdmin already exists");
      process.exit(0);
    }

    await Admin.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: "admin123", // 🔐 will be hashed automatically
      role: "SUPERADMIN",
    });

    console.log("✅ SuperAdmin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating SuperAdmin:", err);
    process.exit(1);
  }
}

createSuperAdmin();
