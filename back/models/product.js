const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    name: {
        type: String,
        required: [true, "You must enter name of product"],
        minlength: [3, "Minimal length of product name is 3 characters"],
        maxlength: [15, "Max length of product name is 15 characters"],
        index: { unique: true }
    },
    description: {
        type: String,
        required: false,
        /*
        minlength: [10, "Minimal length of product description is 10 characters"],
        maxlength: [150, "Max length of product description is 150 characters"],
        */
    },
    price: {
        type: Number,
        min: [1, "Minimal price of product is 1 euro"],
        max: [10000, "Max price of product is 10000 euro"],
        required: [true, "You must enter price of product"],
    },
    quantity: {
        type: Number,
        required: false,
        min: [1, "Minimal quantity of product is 1"],
        max: [10, "Max quantity of product is 10"],
        default: 1
    },
    image: {
        type: String,
        default: "../front/products/public/uploads/default_image.svg"
    }


}, { timestamps: true })


module.exports = mongoose.model("Product", Product);