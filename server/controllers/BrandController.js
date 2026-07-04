const { uniqueImageName } = require("../helper/helper");
const messages = require("../message");
const { BrandModel } = require("../models/BrandModel");
const fs = require("fs");


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
        const file = req.files.image;
        const brandExist = await BrandModel.findOne({ name: req.body.name });

        if (brandExist) {
            return res.send({
                messages: "Resourse-already created",
                flag: 0
            })
        }
        const image = uniqueImageName(file.name);
        const destination = "./public/images/brand/" + image;

        file.mv(
            destination,
            async (error) => {
                if (error) {
                    return res.send(messages.image_upload_failed);
                } else {
                    await BrandModel.create({
                        name: req.body.name,
                        slug: req.body.slug,
                        image_name: image
                    })
                    return res.send(messages.created)
                }

            }
        )


    } catch (error) {
        console.log(error)
        res.send(messages.catch_error);
    }

}

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
        console.log(id)
        const brand = await BrandModel.findById({ _id: id });
        if (!brand) return res.send(messages.not_found)
        await BrandModel.findByIdAndDelete(id)
        fs.unlinkSync("./public/images/brand/" + brand.image_name)
        res.send(messages.delete_resourse)


    } catch (error) {
        console.log(error)
        res.send(messages.catch_error);
    }

}


const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const brand_image = req.files != null ? req.files.image : null
        const { name, slug } = req.body;
        const brand = await BrandModel.findById(id);
        if (!brand) return res.send({ msg: "brand not found", flag: 0 })
        const update = {};

        if (name) update.name = name
        if (slug) update.slug = slug


        if (brand_image != null) {
            const image = uniqueImageName(brand_image.name);
            const destination = "./public/images/brand/" + image;
            brand_image.mv(
                destination,
                async (error) => {
                    if (error) {
                        return res.send(messages.image_upload_failed);
                    } else {
                        if (image) update.image_name = image
                        await BrandModel.findByIdAndUpdate(id, { $set: update });
                        res.send(messages.update);
                        fs.unlinkSync("./public/images/brand/" + brand.image_name)

                    }
                }
            )


        } else {
            await BrandModel.findByIdAndUpdate(id, { $set: update });
            res.send(messages.update);
        }



    } catch (error) {
        console.log(error)
        res.send(messages.catch_error);
    }
}

module.exports = { getData, createData, status, deleteData, getDataById, updateData };