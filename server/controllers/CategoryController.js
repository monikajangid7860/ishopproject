const uploadToCloudinary = require("../helper/cloudinaryUpload");
const cloudinary = require("../config/cloudinary");
const messages = require("../message");
const { CategoryModel } = require("../models/CategoryModel");



const getData = async (req, res) => {
    const query = req.query;
    const dynamicQuery = {};

    let limit = 0;

    if(query.limit){
        limit = parseInt(query.limit);
    }
    if(query.status){
        dynamicQuery.status = query.status == 'true' ? true : false;
    }
    if(query.home){
        dynamicQuery.on_home = query.home == 'true' ? true : false;
    }
    if(query.top){
        dynamicQuery.is_top = query.top == 'true' ? true : false;
    }
    if(query.best){
        dynamicQuery.is_best = query.best == 'true' ? true : false;
    }
    if(query.slug){
        dynamicQuery.slug = query.slug;
    }

    console.log(dynamicQuery, "FILTERS USED");

    try {
        const categories = await CategoryModel.find(dynamicQuery).limit(limit);
        res.send({
            message: "Category Find",
            flag: 1,
            categories,
            imageUrl: `${process.env.SERVER_URL}/images/category/`
        })
    } catch (error) {
        console.log(error)
        res.send(messages.catch_error);
    }
};

const getDataById = async (req, res) => {
    try {
        const id = req.params.id
        const category = await CategoryModel.findById({ _id: id });
        res.send({
            message: "Category Find",
            flag: 1,
            category,
            imageUrl: `${process.env.SERVER_URL}/images/category/`
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
  try {
    const file = req.files?.image;

    if (!file) {
      return res.send(messages.image_upload_failed);
    }

    const categoryExist = await CategoryModel.findOne({
      name: req.body.name,
    });

    if (categoryExist) {
      return res.send({
        message: "Resource already created",
        flag: 0,
      });
    }

    const result = await uploadToCloudinary(
      file,
      "ishop/categories"
    );

    await CategoryModel.create({
      name: req.body.name,
      slug: req.body.slug,

      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    res.send(messages.created);
  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};

const status = async (req, res) => {
    try {
        const objKey = {};
        const flag = req.body.flag
        const id = req.params.id;
        const categoryExist = await CategoryModel.findById(id);
        if (!categoryExist) {
            return res.send({
                messages: "Category not found",
                flag: 0
            })
        }

        if (flag === "1") {
            objKey.status = !categoryExist.status
        } else if (flag === "2") {
            objKey.on_home = !categoryExist.on_home
        } else if (flag === "3") {
            objKey.is_top = !categoryExist.is_top
        } else if (flag === "4") {
            objKey.is_best = !categoryExist.is_best
        }

        await CategoryModel.findByIdAndUpdate(
            { _id: id },
            objKey
        )

        res.send({
            msg: `Status Update`,
            flag: 1
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}


const deleteData = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.send(messages.not_found);
    }

    // Delete image from Cloudinary
    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    // Delete category from MongoDB
    await CategoryModel.findByIdAndDelete(id);

    res.send(messages.delete_resourse);
  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};


const updateData = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, slug } = req.body;
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.send({
        msg: "Category not found",
        flag: 0,
      });
    }

    const update = {};

    // Basic fields
    if (name) update.name = name;
    if (slug) update.slug = slug;

    // Image update
    if (req.files?.image) {
      // Delete old Cloudinary image
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }

      // Upload new image
      const result = await uploadToCloudinary(
        req.files.image,
        "ishop/categories"
      );

      update.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await CategoryModel.findByIdAndUpdate(id, update);

    res.send(messages.update);
  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};
module.exports = { getData, createData, status, deleteData, getDataById, updateData };