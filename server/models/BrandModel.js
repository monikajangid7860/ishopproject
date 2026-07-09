const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 50,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    on_home: {
      type: Boolean,
      default: false,
    },

    is_top: {
      type: Boolean,
      default: false,
    },

    is_best: {
      type: Boolean,
      default: false,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = { BrandModel };