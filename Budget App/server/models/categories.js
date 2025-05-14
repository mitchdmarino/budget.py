const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    transactions: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Transactions"
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Categories', CategoriesSchema)