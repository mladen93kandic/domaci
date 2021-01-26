const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        index: { unique: true }
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 150,
        required: false
    },
    price: {
        type: Number,
        min: 1,
        max: 10000,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        min: 1,
        max: 10,
        default: 1
    },
    image: {
        type: String,
        default: "../front/products/public/default_image.svg"
    }


}, { timestamps: true })


module.exports = mongoose.model("Product", Product);