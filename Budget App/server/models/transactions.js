const mongoose = require('mongoose')


const TransactionsSchema = new mongoose.Schema({
    postDate: {
        type: Date,
    },
    txnDate: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }, 
    amount: {
        type: Number, 
        required: true
    }, owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categories'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Transactions', TransactionsSchema)