const jwt = require("jsonwebtoken");

const verifyWebsiteUser = (req, res, next) => {
  try {
    
      console.log("REQ COOKIES:", req.cookies);
      console.log("JWT SECRET IN VERIFY:", process.env.JWT_SECRET);
    /* ================= 2️⃣ JWT AUTH (NEW USERS) ================= */
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        flag: 0,
        msg: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.authType = "jwt";

    next();
  } catch (error) {
    return res.status(401).json({
      flag: 0,
      msg: "Invalid or expired token",
    });
  }
};

module.exports = { verifyWebsiteUser };
