require("dotenv").config();
const jwt = require("jsonwebtoken");

/* ---------------- VERIFY ADMIN ---------------- */
exports.verifyAdmin = (req, res, next) => {
  console.log("REQ COOKIES:", req.cookies);
  console.log("JWT SECRET IN VERIFY:", process.env.JWT_SECRET);
  try {


    /* ===== 2️⃣ JWT SUPPORT (NEW SYSTEM) ===== */
    const token = req.cookies?.adminToken;

    if (!token) {
      return res
        .status(401)
        .json({ flag: 0, msg: "Admin authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.type !== "admin") {
      return res
        .status(401)
        .json({ flag: 0, msg: "Invalid admin token" });
    }

    req.admin = decoded;
    req.authType = "jwt";

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ flag: 0, msg: "Invalid or expired admin token" });
  }
};

/* ---------------- VERIFY SUPER ADMIN ---------------- */
exports.verifySuperAdmin = (req, res, next) => {
  try {


    /* ===== JWT SUPPORT ===== */
    const token = req.cookies?.adminToken;

    if (!token) {
      return res
        .status(401)
        .json({ flag: 0, msg: "Admin authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "SUPERADMIN") {
      return res
        .status(403)
        .json({ flag: 0, msg: "SuperAdmin access required" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ flag: 0, msg: "Invalid or expired admin token" });
  }
};
