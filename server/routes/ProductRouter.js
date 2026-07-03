const express = require("express");
const fileUpload = require("express-fileupload");

const {
  getData,
  createData,
  status,
  getProductById,
  updateData,
  uploadOtherImages,
  deleteImage,
  deleteData,
  getProductsByIds
} = require("../controllers/ProductController");

const ProductRouter = express.Router();

/* ======================= GET ======================= */
ProductRouter.get("/", getData);

/* ======================= CREATE ======================= */
ProductRouter.post(
  "/create",
  fileUpload({ createParentPath: true }),
  createData
);

/* ======================= UPDATE ======================= */
ProductRouter.put(
  "/update/:id",
  fileUpload({ createParentPath: true }),
  updateData
);

/* ======================= STATUS TOGGLE ======================= */
ProductRouter.patch("/status/:id", status);

/* ======================= OTHER IMAGES ======================= */
ProductRouter.post(
  "/add-other-images",
  fileUpload({ createParentPath: true }),
  uploadOtherImages
);

ProductRouter.delete(
  "/delete-other-image/:product_id/:image_index",
  deleteImage
);

/* ======================= DELETE ======================= */
ProductRouter.delete("/delete/:id", deleteData);

/* ======================= GET BY ID (KEEP AT END) ======================= */
ProductRouter.get("/:id", getProductById);
// routes/productRoutes.js
ProductRouter.post("/by-ids", getProductsByIds);


module.exports = ProductRouter;
