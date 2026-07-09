const messages = require("../message");
const { BrandModel } = require("../models/BrandModel");
const uploadToCloudinary = require("../helper/cloudinaryUpload");
const cloudinary = require("../config/cloudinary");


const getData = async (req, res) => {
    try {
        const brands = await BrandModel.find();
        res.send({
            message: "Brand Find",
            flag: 1,
            brands,
            imageUrl: `${process.env.SERVER_URL}/images/brand/`
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}
const getDataById = async (req, res) => {
    try {
        const id = req.params.id
        const brand = await BrandModel.findById({ _id: id });
        res.send({
            message: "Brand Find",
            flag: 1,
            brand,
            imageUrl: `${process.env.SERVER_URL}/images/brand/`
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
  try {
    const file = req.files?.image;

    if (!file) {
      return res.send({
        msg: "Please select an image",
        flag: 0,
      });
    }

    const brandExist = await BrandModel.findOne({
      name: req.body.name,
    });

    if (brandExist) {
      return res.send({
        msg: "Resource already exists",
        flag: 0,
      });
    }

    const result = await uploadToCloudinary(
      file,
      "ishop/brands"
    );

    await BrandModel.create({
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
        const brandExist = await BrandModel.findById(id);
        if (!brandExist) {
            return res.send({
                messages: "Brand not found",
                flag: 0
            })
        }

        if (flag === "1") {
            objKey.status = !brandExist.status
        } else if (flag === "2") {
            objKey.on_home = !brandExist.on_home
        } else if (flag === "3") {
            objKey.is_top = !brandExist.is_top
        } else if (flag === "4") {
            objKey.is_best = !brandExist.is_best
        }

        await BrandModel.findByIdAndUpdate(
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

    const brand = await BrandModel.findById(id);

    if (!brand) {
      return res.send(messages.not_found);
    }

    // Delete image from Cloudinary
    if (brand.image?.public_id) {
      await cloudinary.uploader.destroy(
        brand.image.public_id
      );
    }

    await BrandModel.findByIdAndDelete(id);

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

    const brand = await BrandModel.findById(id);

    if (!brand) {
      return res.send({
        msg: "Brand not found",
        flag: 0,
      });
    }

    const update = {};

    if (name) update.name = name;
    if (slug) update.slug = slug;

    if (req.files?.image) {
      // Delete old Cloudinary image
      if (brand.image?.public_id) {
        await cloudinary.uploader.destroy(
          brand.image.public_id
        );
      }

      // Upload new image
      const result = await uploadToCloudinary(
        req.files.image,
        "ishop/brands"
      );

      update.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await BrandModel.findByIdAndUpdate(id, update);

    res.send(messages.update);
  } catch (error) {
    console.log(error);
    res.send(messages.catch_error);
  }
};
module.exports = { getData, createData, status, deleteData, getDataById, updateData };