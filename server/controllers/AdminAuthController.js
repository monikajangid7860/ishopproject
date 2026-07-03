const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        flag: 0,
        msg: "Email and password required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        flag: 0,
        msg: "Invalid credentials",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        flag: 0,
        msg: "Admin account disabled",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        flag: 0,
        msg: "Invalid credentials",
      });
    }

    /* ========= SESSION (OLD) ========= */
    
    exports.getAdminMe = (req, res) => {
  if (!req.admin) {
    return res.status(401).json({ flag: 0 });
  }

  res.json({
    flag: 1,
    admin: req.admin,
  });
};


    /* ========= JWT TOKEN (NEW) ========= */
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        type: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    /* ========= SEND COOKIE ========= */
    res.cookie("adminToken", token, {
  httpOnly: true,
  secure: false,        // dev only
  sameSite: "lax",
  path: "/",            // VERY IMPORTANT
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


    return res.json({
      flag: 1,
      msg: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Admin login error", err);
    res.status(500).json({ flag: 0, msg: "Server error" });
  }
};

exports.adminLogout = (req, res) => {
  res.clearCookie("adminToken");
  res.json({
    flag: 1,
    msg: "Admin logged out",
  });
};


