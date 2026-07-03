const OrderModel = require("../models/OrderModel");
const CartModel = require("../models/CartModel");
const UserModel = require("../models/UserModel");
const {razorpay} = require("../helper/helper");
const crypto = require("crypto");
const { getIO } = require("../socket");
const AdminNotification = require("../models/AdminNotificationModel");
const { error } = require("console");




/* ================= CREATE ORDER ================= */
exports.createOrder = async (req, res) => {

console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);
  try {
    const user_id = req.user._id;
    const { addressId, paymentMethod } = req.body;
    console.log("aaaaaaa", addressId, paymentMethod);
    console.log("USER ID TYPE 👉", typeof user_id, user_id);


    if (!addressId || !paymentMethod) {
      return res.status(400).json({
        flag: 0,
        msg: "Address & payment method required",
      });
    }

    /* ---------- USER & ADDRESS ---------- */
    const user = await UserModel.findById(user_id);
    const address = user?.address.id(addressId);

    if (!address) {
      return res.status(404).json({
        flag: 0,
        msg: "Address not found",
      });
    }

    /* ---------- CART ---------- */
    const cart = await CartModel.findOne({ user_id }).populate(
      "items.product_id"
    );
    console.log("CART FOUND 👉", cart);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        flag: 0,
        msg: "Cart is empty",
      });
    }
    
    /* ---------- PRICE CALC ---------- */
    let subtotal = 0;

    const items = cart.items.map((item) => {
      const price = item.product_id.final_price;
      subtotal += price * item.quantity;

      return {
        product_id: item.product_id._id,
        name: item.product_id.name,
        price,
        quantity: item.quantity,
      };
    });

    const delivery = subtotal >= 999 ? 0 : 49;
    const total = subtotal + delivery;

    /* ---------- CREATE ORDER (COMMON) ---------- */
    const order = await OrderModel.create({
      user_id,
      items,
      shippingAddress: address.toObject(),
      paymentMethod,
      subtotal,
      delivery,
      total,
      paymentStatus: paymentMethod === "COD" ? "PAID" : "PENDING",
    });

    /* ================= COD ================= */
    if (paymentMethod === "COD") {
  cart.items = [];
  await cart.save();

  // 🔥 SOCKET EMIT
  const io = getIO();
  io.emit("order:new", {
    orderId: order._id,
    userId: user_id,
    total: order.total,
    paymentMethod: order.paymentMethod,
    status: order.status,
    createdAt: order.createdAt,
  });

  return res.status(201).json({
    flag: 1,
    msg: "Order placed (COD)",
    order,
  });
}



    /* ================= ONLINE (RAZORPAY) ================= */
    const razorOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    order.razorpay_order_id = razorOrder.id;
    await order.save();

    res.status(201).json({
      flag: 1,
      msg: "Proceed to payment",
      razorpayOrderId: razorOrder.id,
      orderId: order._id,
      amount: total * 100,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({
      flag: 0,
      msg: "Failed to place order",
    });
  }
};

/* ================= VERIFY RAZORPAY PAYMENT ================= */
exports.verifyPayment = async (req, res) => {
  try {
    console.log("here")
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;
     console.log("bodyyyyy",req.body);
    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        flag: 0,
        msg: "Payment verification failed",
      });
    }

    const order = await OrderModel.findById(orderId);

    order.paymentStatus = "PAID";
    order.razorpay_payment_id = razorpay_payment_id;
    await order.save();
    // 🔔 SAVE ADMIN NOTIFICATION (ONLINE)
await AdminNotification.create({
  type: "ORDER",
  title: "New Order Placed",
  message: `Order #${order._id.toString().slice(-6)} placed`,
  data: {
    orderId: order._id,
    total: order.total,
  },
});
// 🔥 SOCKET EMIT
    const io = getIO();
io.emit("order:new", {
  orderId: order._id,
  userId: order.user_id,
  total: order.total,
  paymentMethod: order.paymentMethod,
  status: order.status,
  createdAt: order.createdAt,
});


    await CartModel.updateOne(
      { user_id: req.user._id },
      { $set: { items: [] } }
    );

    res.json({
      flag: 1,
      msg: "Payment successful",
    });
  } catch (error) {
    console.error("razorpay error:", error.message);
    res.status(500).json({
      flag: 0,
      msg: "Payment verification error",
    });
  }
};

/* ================= GET USER ORDERS ================= */
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      user_id: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({ flag: 1, orders });
  } catch (err) {
    res.status(500).json({
      flag: 0,
      msg: "Failed to fetch orders",
    });
  }
};
/* ================= UPDATE ORDER STATUS (ADMIN) ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "PLACED",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        flag: 0,
        msg: "Invalid order status",
      });
    }

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        flag: 0,
        msg: "Order not found",
      });
    }

    order.status = status;
    await order.save();
    console.log("Updated order status to", status);

    res.json({
      flag: 1,
      msg: "Order status updated",
      status: order.status,

    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({
      flag: 0,
      msg: "Failed to update order status",
    });
  }
};
/* ================= GET RECENT ORDERS (ADMIN) ================= */
exports.getRecentOrdersForAdmin = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user_id", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      flag: 1,
      orders,
    });
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    res.status(500).json({
      flag: 0,
      msg: "Failed to fetch orders",
    });
  }
};
