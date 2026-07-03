require("dotenv").config();
const bcrypt = require("bcrypt");
const messages = require("../message");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");


/* ================= REGISTER ================= */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        flag: 0,
        msg: "All fields are required",
      });
    }

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        flag: 0,
        msg: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      flag: 1,
      msg: "Account created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(messages.catch_error);
  }
};

/* ================= LOGIN (SESSION BASED) ================= */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log(email, password,"<================== LOGIN ATTEMPT ==================>");
    if (!email || !password) {
      return res.status(400).json({
        flag: 0,
        msg: "Email and password required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        flag: 0,
        msg: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        flag: 0,
        msg: "Invalid credentials",
      });
    }

    // ✅ CREATE JWT
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        type: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ SEND COOKIE
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      flag: 1,
      msg: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.msg);
    res.status(500).json({
      flag: 0,
      msg: "Login failed",
    });
  }
};


/* ================= LOGOUT ================= */
const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.json({
    flag: 1,
    msg: "Logged out",
  });
};

module.exports = { register, login, logout };

