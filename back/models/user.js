const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        index: { unique: true }
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 35,
        required: true,
        unique: true
    },
    role: {
        type: Boolean,
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    }]
}, { timestamps: true })


module.exports = mongoose.model('User', User)