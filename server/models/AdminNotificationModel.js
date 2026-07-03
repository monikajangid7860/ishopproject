const mongoose = require("mongoose");

const AdminNotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["ORDER"],
      required: true,
    },

    title: String,
    message: String,

    data: {
      orderId: mongoose.Schema.Types.ObjectId,
      total: Number,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AdminNotification",
  AdminNotificationSchema
);
