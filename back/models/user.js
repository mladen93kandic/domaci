const mongoose = require("mongoose");
const validator = require("validator");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You must enter username"],
        minlength: [3, "Minimal length of username is 3 caracters"],
        maxlength: [20, "Max length of username is 20 caracters"],
        index: { unique: true }
    },
    password: {
        type: String,
        required: [true, "You must enter password"],
    },
    email: {
        type: String,
        minlength: [5, "Minimal length of email is 5 caracters"],
        maxlength: [35, "Max length of email is 35 caracters"],
        required: [true, "You must enter email"],
        index: { unique: true },
        validate: [validator.isEmail, "You must enter valid email"]
    },
    role: {
        type: Number,
        required: [true, "You must enter role"]
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false
    }]
}, { timestamps: true })


module.exports = mongoose.model("User", User);