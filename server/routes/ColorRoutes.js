const express = require('express');
const {
  getData,
  createData,
  status,
  deleteData,
  getDataById,
  updateColor
} = require("../controllers/ColorController");

const ColorRouter = express.Router();

/* GET ALL COLORS */
ColorRouter.get("/", getData);

/* GET COLOR BY ID */
ColorRouter.get("/:id", getDataById);

/* CREATE COLOR */
ColorRouter.post("/create", createData);

/* TOGGLE STATUS */
ColorRouter.patch("/status/:id", status);

/* DELETE COLOR */
ColorRouter.delete("/delete/:id", deleteData);

/* ✅ UPDATE COLOR (FIXED) */
ColorRouter.put("/update/:id", updateColor);

module.exports = ColorRouter;
