const { uniqueImageName } = require("../helper/helper");
const messages = require("../message");
const { CategoryModel } = require("../models/CategoryModel");
const fs = require("fs");


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
            imageUrl: "http://localhost:5000/images/category/"
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
            imageUrl: "http://localhost:5000/images/category/"
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
    try {
        const file = req.files.image;
        const categoryExist = await CategoryModel.findOne({ name: req.body.name });

        if (categoryExist) {
            return res.send({
                messages: "Resourse-already created",
                flag: 0
            })
        }
        const image = uniqueImageName(file.name);
        const destination = "./public/images/category/" + image;

        file.mv(
            destination,
            async (error) => {
                if (error) {
                    return res.send(messages.image_upload_failed);
                } else {
                    await CategoryModel.create({
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
        console.log(id)
        const category = await CategoryModel.findById({ _id: id });
        if (!category) return res.send(messages.not_found)
        await CategoryModel.findByIdAndDelete(id)
        fs.unlinkSync("./public/images/category/" + category.image_name)
        res.send(messages.delete_resourse)


    } catch (error) {
        console.log(error)
        res.send(messages.catch_error);
    }

}


const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const category_image = req.files != null ? req.files.image : null
        const { name, slug } = req.body;
        const category = await CategoryModel.findById(id);
        if (!category) return res.send({ msg: "category not find", flag: 0 })
        const update = {};

        if (name) update.name = name
        if (slug) update.slug = slug


        if (category_image != null) {
            const image = uniqueImageName(category_image.name);
            const destination = "./public/images/category/" + image;
            category_image.mv(
                destination,
                async (error) => {
                    if (error) {
                        return res.send(messages.image_upload_failed);
                    } else {
                        if (image) update.image_name = image
                        await CategoryModel.findByIdAndUpdate(id, { $set: update });
                        res.send(messages.update);
                        fs.unlinkSync("./public/images/category/" + category.image_name)

                    }
                }
            )


        } else {
            await CategoryModel.findByIdAndUpdate(id, { $set: update });
            res.send(messages.update);
        }



    } catch (error) {
        console.log(error)
        res.send(messages.catch_error);
    }
}

module.exports = { getData, createData, status, deleteData, getDataById, updateData };