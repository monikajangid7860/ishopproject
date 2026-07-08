const { uniqueImageName } = require("../helper/helper");
const messages = require("../message");
const ProductModel = require("../models/ProductModel");
const fs = require("fs");
const { CategoryModel } = require("../models/CategoryModel");
const { ColorModel } = require("../models/ColorModel");
const { BrandModel } = require("../models/BrandModel");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../helper/cloudinaryUpload");

/* ========================= GET PRODUCTS ========================= */
const getData = async (req, res) => {
  try {
    const query = req.query;
    const dynamicquery = {};

    if (query.home !== undefined)
      dynamicquery.show_home = query.home === "true";

    if (query.top !== undefined) dynamicquery.is_top = query.top === "true";

    if (query.best !== undefined)
      dynamicquery.is_best_seller = query.best === "true";

    if (query.hot !== undefined) dynamicquery.is_hot = query.hot === "true";

    if (query.status !== undefined)
      dynamicquery.status = query.status === "true";

    if (query.featured !== undefined)
      dynamicquery.is_featured = query.featured === "true";

    if (query.stock !== undefined) dynamicquery.stock = query.stock === "true";

    if (query.product_slug) dynamicquery.slug = query.product_slug;

    /* ---------- CATEGORY ---------- */
    if (query.category_slug) {
      const category = await CategoryModel.findOne({
        slug: query.category_slug,
      });
      if (category) dynamicquery.category_id = category._id;
    }
    console.log(query);
    /* ---------- COLORS ---------- */
    if (query.colors) {
      const colorSlugs = query.colors.split("_");
      console.log(colorSlugs);
      const colors = await ColorModel.find({
        name: { $in: colorSlugs },
      }).select("_id");
      console.log(colors);
      dynamicquery.color_ids = { $in: colors.map((c) => c._id) };
    }

    /* ---------- BRANDS ---------- */
    if (query.brands) {
      const brandSlugs = query.brands.split("_");
      const brands = await BrandModel.find({
        slug: { $in: brandSlugs },
      }).select("_id");
      dynamicquery.brand_id = { $in: brands.map((b) => b._id) };
    }
    const dynamicSort = {};
    if (query.sortby) {
      if (query.sortby == "1") {
        dynamicSort.createdAt == -1;
      } else if (query.sortby == "2") {
        dynamicSort.createdAt = 1;
      } else if (query.sortby == "3") {
        dynamicSort.final_price = 1;
      } else if (query.sortby == "4") {
        dynamicSort.final_price = -1;
      } else if (query.sortby == "5") {
        dynamicSort.name = 1;
      } else if (query.sortby == "6") {
        dynamicSort.name = -1;
      }
    }
    console.log(dynamicquery);
    const products = await ProductModel.find(dynamicquery)
      .populate([
        { path: "category_id", select: "name slug" },
        { path: "brand_id", select: "name slug" },
        { path: "color_ids", select: "name code" },
      ])
      .limit(parseInt(query.limit) || 0)
      .sort(dynamicSort);

    res.send({
      message: "Product Found",
      flag: 1,
      products,
      imageUrl: `${process.env.SERVER_URL}/images/product/`,
    });
  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};

/* ========================= GET PRODUCT BY ID ========================= */
/* ========================= GET PRODUCT BY ID ========================= */
const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate([
      { path: "category_id", select: "name slug" },
      { path: "brand_id", select: "name slug" },
      { path: "color_ids", select: "name code" },
    ]);

    if (!product) {
      return res.send({ message: "Product not found", flag: 0 });
    }

    res.send({
      message: "Product Found",
      flag: 1,
      product,
      imageUrl: `${process.env.SERVER_URL}/images/product/`,
    });
  }catch (error) {
  console.error("CREATE PRODUCT ERROR:");
  console.error(error);

  return res.status(500).json({
    flag: 0,
    message: error.message,
    stack: error.stack,
  });
}
};

/* ========================= CREATE PRODUCT ========================= */
// const createData = async (req, res) => {
//   try {
//     const file = req.files?.thumbnail;
//     if (!file) return res.send(messages.image_upload_failed);

//     const productExist = await ProductModel.findOne({ name: req.body.name });
//     if (productExist) {
//       return res.send({ message: "Resource already created", flag: 0 });
//     }

//     const imageName = uniqueImageName(file.name);
//     const destination = "./public/images/product/main_images/" + imageName;

//     await file.mv(destination);

//     await ProductModel.create({
//       name: req.body.name,
//       slug: req.body.slug,
//       thumbnail: imageName,
//       original_price: req.body.original_price,
//       final_price: req.body.final_price,
//       discount_percentage: req.body.discount_percentage,
//       category_id: req.body.category_id,
//       brand_id: req.body.brand_id,
//       color_ids: req.body.color_ids ? JSON.parse(req.body.color_ids) : [],
//       description: req.body.description,
//     });

//     res.send(messages.created);
//   } catch (error) {
//     console.log(error);
//     res.send(messages.catch_error);
//   }
// };
const createData = async (req, res) => {
  try {
    const file = req.files?.thumbnail;

    if (!file) {
      return res.send(messages.image_upload_failed);
    }

    const productExist = await ProductModel.findOne({
      name: req.body.name,
    });

    if (productExist) {
      return res.send({
        message: "Resource already created",
        flag: 0,
      });
    }

    /* ---------------- UPLOAD TO CLOUDINARY ---------------- */

    const uploadResult = await uploadToCloudinary(
      file,
      "ishop/products/main"
    );

    /* ---------------- SAVE PRODUCT ---------------- */

    await ProductModel.create({
      name: req.body.name,
      slug: req.body.slug,

      // Store Cloudinary URL instead of filename
     thumbnail: {
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
},

      original_price: req.body.original_price,
      final_price: req.body.final_price,
      discount_percentage: req.body.discount_percentage,

      category_id: req.body.category_id,
      brand_id: req.body.brand_id,

      color_ids: req.body.color_ids
        ? JSON.parse(req.body.color_ids)
        : [],

      description: req.body.description,
    });

    return res.send(messages.created);
  } catch (error) {
    console.log(error);
    return res.send(messages.catch_error);
  }
};
/* ========================= STATUS TOGGLE ========================= */
const status = async (req, res) => {
  try {
    const { flag } = req.body;
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.send({ message: "Product not found", flag: 0 });

    const update = {};

    if (flag === "1") update.status = !product.status;
    else if (flag === "2") update.show_home = !product.show_home;
    else if (flag === "3") update.is_featured = !product.is_featured;
    else if (flag === "4") update.is_best_seller = !product.is_best_seller;
    else if (flag === "5") update.is_hot = !product.is_hot;
    else if (flag === "6") update.stock = !product.stock;

    await ProductModel.findByIdAndUpdate(req.params.id, update);
    res.send({ msg: "Status Updated", flag: 1 });
  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};

/* ========================= UPLOAD OTHER IMAGES ========================= */
const uploadOtherImages = async (req, res) => {
  try {
    const { product_id } = req.body;
    const files = req.files?.other_images;

    if (!files) return res.send({ msg: "No images provided", flag: 0 });

    const product = await ProductModel.findById(product_id);
    if (!product) return res.send({ msg: "Product not found", flag: 0 });

    const other_images = product.other_images || [];

    const images = Array.isArray(files) ? files : [files];

    for (const img of images) {
      const name = uniqueImageName(img.name);
      await img.mv("./public/images/product/other_images/" + name);
      other_images.push(name);
    }

    product.other_images = other_images;
    await product.save();

    res.send({
      msg: "Images uploaded",
      flag: 1,
      updated_other_images: other_images,
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Error uploading images", flag: 0 });
  }
};

/* ========================= DELETE SINGLE IMAGE ========================= */
const deleteImage = async (req, res) => {
  try {
    const { product_id, image_index } = req.params;
    const index = parseInt(image_index);

    const product = await ProductModel.findById(product_id);
    if (!product) return res.send({ msg: "Product not found", flag: 0 });

    const removed = product.other_images.splice(index, 1)[0];
    await product.save();

    try {
      fs.unlinkSync("./public/images/product/other_images/" + removed);
    } catch {}

    res.send({
      msg: "Image deleted",
      flag: 1,
      updated_other_images: product.other_images,
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Error deleting image", flag: 0 });
  }
};

/* ========================= DELETE PRODUCT ========================= */
const deleteData = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.send(messages.not_found);

    if (product.thumbnail) {
      try {
        fs.unlinkSync(
          "./public/images/product/main_images/" + product.thumbnail
        );
      } catch {}
    }

    if (product.other_images?.length) {
      product.other_images.forEach((img) => {
        try {
          fs.unlinkSync("./public/images/product/other_images/" + img);
        } catch {}
      });
    }

    await ProductModel.findByIdAndDelete(req.params.id);
    res.send(messages.delete_resourse);
  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};

/* ========================= UPDATE PRODUCT ========================= */
/* ========================= UPDATE PRODUCT ========================= */
const updateData = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.send({
        message: "Product not found",
        flag: 0,
      });
    }

    const update = {};

    // -------- BASIC FIELDS --------
    if (req.body.name) update.name = req.body.name;
    if (req.body.slug) update.slug = req.body.slug;

    if (req.body.original_price)
      update.original_price = req.body.original_price;

    if (req.body.final_price)
      update.final_price = req.body.final_price;

    if (req.body.discount_percentage)
      update.discount_percentage = req.body.discount_percentage;

    if (req.body.description)
      update.description = req.body.description;

    // -------- RELATIONS --------
    if (req.body.category_id && req.body.category_id !== "undefined") {
      update.category_id = req.body.category_id;
    }

    if (req.body.brand_id && req.body.brand_id !== "undefined") {
      update.brand_id = req.body.brand_id;
    }

    if (req.body.color_ids && req.body.color_ids !== "undefined") {
      update.color_ids = JSON.parse(req.body.color_ids);
    }

    // -------- IMAGE UPDATE --------
    if (req.files?.thumbnail) {
      // Delete old Cloudinary image
      if (product.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(product.thumbnail.public_id);
      }

      // Upload new image
      const result = await uploadToCloudinary(
        req.files.thumbnail,
        "ishop/products/main"
      );

      update.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await ProductModel.findByIdAndUpdate(req.params.id, update);

    res.send({
      message: "Product updated successfully",
      flag: 1,
    });

  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};
/* ========================= GET PRODUCTS BY IDS ========================= */
const getProductsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.send({
        flag: 1,
        products: [],
        imageUrl: `${process.env.SERVER_URL}/images/product/`,
      });
    }

    // Safety cap (recently viewed max)
    const safeIds = ids.slice(0, 10);

    const products = await ProductModel.find({
      _id: { $in: safeIds },
      status: true, // respects product visibility
    })
      .select("name slug thumbnail final_price discount_percentage")
      .lean();

    // Preserve order of recently viewed
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    const orderedProducts = safeIds
      .map((id) => productMap.get(id))
      .filter(Boolean);

    res.send({
      flag: 1,
      products: orderedProducts,
      imageUrl: `${process.env.SERVER_URL}/images/product/`,
    });
  } catch (error) {
    console.log("getProductsByIds error:", error);
    res.send(messages.catch_error);
  }
};

module.exports = {
  getData,
  getProductById,
  createData,
  status,
  uploadOtherImages,
  deleteImage,
  deleteData,
  updateData,
  getProductsByIds,
};
