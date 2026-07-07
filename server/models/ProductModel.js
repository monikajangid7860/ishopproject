const mongoose = require("mongoose");
const { ColorModel } = require("./ColorModel");
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 150
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description:{
            type:String,
            required:true
        },
      thumbnail: {
    type: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
    },
    required: true,
},

        original_price: {
            type: Number,
            required: true
        },

        discount_percentage: {
            type: Number,
            default: 0
        },

        final_price: {
            type: Number,
            required: true
        },

        status: {
            type: Boolean,
            default: true
        },

        stock: {
            type: Boolean,
            default: true
        },

        is_best_seller: {
            type: Boolean,
            default: false
        },

        show_home: {
            type: Boolean,
            default: false
        },

        is_featured: {
            type: Boolean,
            default: false
        },

        is_hot: {
            type: Boolean,
            default: false
        },
        // ['qw4qweq','q2q231231','123123123','3241243124']
        other_images: [
    {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
],
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        // []
        color_ids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: ColorModel
            }
        ],

        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("product", ProductSchema);