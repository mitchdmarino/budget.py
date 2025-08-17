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

// Updating Categories Automatically when new transactions are created.
// CHeck if there is a similar transaction that already is categorized, then assign it to the new doc's category
TransactionsSchema.pre("save", async function (next) {
    if (this.isNew) {
        console.log("Running transaction pre save for a new document");
        // when creating a transaction, we want to check if a similar one has already been categorized, so we can automatically categorize it
        var likeTxns = await mongoose
            .model("Transactions")
            .find({
                owner: this.owner,
                description: this.description,
            })
            .populate("category");
        // check the first one with a category, if it has a category, assign to this one
        for (const data of likeTxns) {
            console.log(data);
            if (data.category) {
                this.category = data.category._id;
                break;
            }
        }
    }
    next();
});

TransactionsSchema.pre("insertMany", async function (docs) {
    if (!Array.isArray(docs)) {
        console.log("insertMany docs is not an array:", docs);
        return;
    }

    for (const doc of docs) {
        console.log("Running pre-insertMany for doc:", doc);

        const likeTxns = await mongoose
            .model("Transactions")
            .find({
                owner: doc.owner,
                description: doc.description,
            })
            .populate("category");

        for (const data of likeTxns) {
            if (data.category) {
                doc.category = data.category._id;
                break;
            }
        }
    }
});

TransactionsSchema.post("findOneAndUpdate", async function (doc) {
    console.log("Running transaction pre save for an updated document");
    const docToUpdate = await this.model.findOne(this.getQuery());
    // if we are updating an existing transaction, we want to make sure we update the categories for all similar transactions
    console.log(docToUpdate.owner);
    console.log(docToUpdate.description);
    var likeTxns = await mongoose.model("Transactions").find({
        owner: docToUpdate.owner,
        description: docToUpdate.description,
    });
    console.log(likeTxns.length);
    for (const txn of likeTxns) {
        console.log(txn.description);
        console.log("Found a txn to save");
        txn.category = docToUpdate.category;
        await txn.save();
    }
});

module.exports = mongoose.model("Transactions", TransactionsSchema);
