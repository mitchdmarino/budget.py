const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    color: {
        type: String, 
        required: true, 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    transactions: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Transaction"
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Category', CategorySchema)