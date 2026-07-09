const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 50,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        image: {
  url: String,
  public_id: String,

        },
        on_home: {
            type: Boolean,
            default: false
        },
        is_top: {
            type: Boolean,
            default: false
        },
        is_best: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = { CategoryModel };