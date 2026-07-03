
const messages = require("../message");

const { ColorModel } = require("../models/ColorModel");


const getData = async (req, res) => {
    try {
        const colors = await ColorModel.find();
        res.send({
            message: "Colors Find",
            flag: 1,
            colors
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}



const getDataById = async (req, res) => {
    try {
        const id = req.params.id
        const color = await ColorModel.findById({ _id: id });
        res.send({
            message: "Color Find",
            flag: 1,
            color
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
    try {

        const color = await ColorModel.findOne({ name: req.body.name });

        if (color) {
            return res.send({
                messages: "Resourse-already created",
                flag: 0
            })
        }

        await ColorModel.create({
            name: req.body.name,
            slug:req.body.slug,
            code: req.body.code
        })
        return res.send(messages.created)


    } catch (error) {
console.log(error)   
        res.send(messages.catch_error);
    }

}

const status = async (req, res) => {
    try {

        const id = req.params.id;
        const color = await ColorModel.findById(id);
        if (!color) {
            return res.send({
                messages: "Color not found",
                flag: 0
            })
        }


        await ColorModel.findByIdAndUpdate(
            { _id: id },
            { $set: { status: !color.status } }
        )

        res.send({
            msg: `Status Update`,
            flag: 1
        })

    } catch (error) {
        console.log(error.errmsg)
        res.send(messages.catch_error);
    }
}


const deleteData = async (req, res) => {
    try {
        const id = req.params.id;

        const color = await ColorModel.findById({ _id: id });
        if (!color) return res.send(messages.not_found)
        await ColorModel.findByIdAndDelete(id)
        res.send(messages.delete_resourse)


    } catch (error) {
        console.log(error)
        res.send(messages.catch_error);
    }

}
const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, code } = req.body;

    // Build update object safely
    const update = {};
    if (name) update.name = name;
    if (slug) update.slug = slug;
    if (code) update.code = code;

    const updatedColor = await ColorModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true } // return updated document
    );

    if (!updatedColor) {
      return res.status(404).json({
        flag: 0,
        msg: "Color not found",
      });
    }

    res.status(200).json({
      flag: 1,
      msg: "Color updated successfully",
      color: updatedColor,
    });
  } catch (error) {
    console.error("Update color error:", error);
    res.status(500).json({
      flag: 0,
      msg: "Internal Server Error",
    });
  }
};





module.exports = { getData, createData, status, deleteData, getDataById,updateColor};