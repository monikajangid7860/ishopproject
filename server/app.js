const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const { connectDB } = require("./connect_db");
const { verifyAdmin } = require("./middleware/AdminAuth");
/* ================= START SERVER ================= */
const http = require("http");
const { initSocket } = require("./socket");

dotenv.config();

const app = express();

/* ================= CORE MIDDLEWARE ================= */
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.set("trust proxy", 1);

/* ================= SESSION ================= */


/* ================= ROUTES ================= */
const CategoryRouter = require("./routes/CategoryRoutes");
const BrandRouter = require("./routes/BrandRoute");
const ColorRouter = require("./routes/ColorRoutes");
const ProductRouter = require("./routes/ProductRouter");
const UserRouter = require("./routes/UserRoute");
const CartRouter = require("./routes/CartRouter");
const WishlistRouter = require("./routes/WishlistRoutes");
const AddressRouter = require("./routes/AddressRoute");
const OrderRouter = require("./routes/OrderRoutes");
const AdminAnalyticsRouter = require("./routes/AdminAnalyticsRoute");
/* ADMIN */
const AdminAuthRouter = require("./routes/AdminAuthRoute"); // login / logout
const AdminRouter = require("./routes/AdminRoute"); // protected admin features

/* PUBLIC / USER */
app.use("/category", CategoryRouter);
app.use("/brand", BrandRouter);
app.use("/color", ColorRouter);
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/cart", CartRouter);
app.use("/wishlist", WishlistRouter);
app.use("/address", AddressRouter);
app.use("/order", OrderRouter);

/* ADMIN AUTH (NO PROTECTION) */
app.use("/admin/auth", AdminAuthRouter);

/* ADMIN FEATURES (PROTECTED) */
app.use("/admin", verifyAdmin, AdminRouter);

app.use("/admin/analytics", verifyAdmin, AdminAnalyticsRouter);
;




/* ================= START SERVER ================= */
connectDB()
  .then(() => {
    console.log("DB Connected");

    const server = http.createServer(app);

    // 🔥 INIT SOCKET.IO
    initSocket(server);

    server.listen(5000, () => {
      console.log("🚀 Server + Socket running on port 5000");
    });
  })
  .catch(() => {
    console.log("Unable to connect DB");
  });

