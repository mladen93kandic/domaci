const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    name: {
        type: String,
        required: true,
        index: { unique: true }
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    },
    image: {
        type: String
    }


}, { timestamps: true })


module.exports = mongoose.model('Product', Product)