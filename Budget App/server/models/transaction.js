const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema(
    {
        postDate: {
            type: Date,
        },
        txnDate: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    {
        timestamps: true,
    }
);

TransactionsSchema.methods.categorizeLikeTxns = async function (user) {
    var likeTxns = await mongoose.model("Transactions").find({
        owner: user._id,
        description: this.description,
    });
    for (const txn of likeTxns) {
        console.log(txn);
        console.log(this.category);
        txn.category = this.category;
        await txn.save();
    }
    return;
};

TransactionsSchema.methods.categorizeFromExistingTxns = async function (user) {
    var likeTxns = await mongoose
        .model("Transactions")
        .find({
            owner: user._id,
            description: this.description,
        })
        .populate("category");
    // check the first one, if it has a category, assign
    for (const data of likeTxns) {
        console.log(data);
        if (data.category) {
            this.category = data.category._id;
            await this.save();
            break;
        }
    }

    return;
};

module.exports = mongoose.model("Transactions", TransactionsSchema);
