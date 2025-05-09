const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    transactions: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Transactions'
    }, 
    categories: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categories'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)