const OrderModel = require("../models/OrderModel");

const getDashboardStats = async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);

    // DB aggregation
    const revenueDB = await OrderModel.aggregate([
  {
    $match: {
      createdAt: { $gte: last7Days },
      status: "DELIVERED",
      paymentMethod: "COD",
    },
  },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
      },
      totalRevenue: { $sum: "$total" }, // ✅ correct field
      orders: { $sum: 1 },
    },
  },
]);
 console.log("revenue",revenueDB)

    // -------- build last 7 days skeleton --------
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      days.push({
        _id: {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate(),
        },
        totalRevenue: 0,
        orders: 0,
      });
    }

    // -------- merge DB data into skeleton --------
    revenueDB.forEach((dbDay) => {
      const index = days.findIndex(
        (d) =>
          d._id.year === dbDay._id.year &&
          d._id.month === dbDay._id.month &&
          d._id.day === dbDay._id.day
      );

      if (index !== -1) {
        days[index] = dbDay;
      }
    });

    res.json({
      flag: 1,
      revenue: days,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ flag: 0, msg: "Analytics error" });
  }
};

module.exports = { getDashboardStats };
