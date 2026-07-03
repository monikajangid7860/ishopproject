const express = require('express');
const { getData, createData, status, deleteData, getDataById, updateData } = require("../controllers/BrandController");
const fileUpload = require('express-fileupload');
const BrandRouter = express.Router();


BrandRouter.get(
    "/",
    getData
)

BrandRouter.get(
    "/:id",
    getDataById
)


BrandRouter.post(
    "/create",
    fileUpload({ createParentPath: true }),
    createData
)

BrandRouter.patch(
    "/status/:id",
    status
)

BrandRouter.delete(
    "/delete/:id",
    deleteData
)


BrandRouter.put(
    "/update/:id",
    fileUpload({ createParentPath: true }),
    updateData
)

module.exports = BrandRouter;

