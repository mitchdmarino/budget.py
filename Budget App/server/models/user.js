const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        transactions: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transactions",
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Categories",
            },
        ],
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.getTransactions = function () {
    return mongoose
        .model("Transactions")
        .find({ owner: this.id })
        .populate("category");
};

/*
run when a user creates an account so we have some categories for them to use. They can edit/ delete these if they want to 
*/
UserSchema.methods.initializeCategories = async function () {
    return await createBaseCategories(this.id);
};

module.exports = mongoose.model("User", UserSchema);

async function createBaseCategories(user) {
    try {
        const cat1 = await createCategory("Grocery", "red", user);
        const cat2 = await createCategory("Restaurants", "green", user);
        const cat3 = await createCategory("Entertainment", "purple", user);
        const cat4 = await createCategory("Fitness", "blue", user);
        const cat5 = await createCategory("Rent", "black", user);
        return [cat1, cat2, cat3, cat4, cat5];
    } catch (error) {
        console.log(error);
    }
}

async function createCategory(name, color, user) {
    try {
        const newCategory = new db.Category({
            name: name,
            owner: user.id,
            color: color,
        });
        await newCategory.save();
        await user.categories.push(newCategory);
        await user.save();
        return newCategory();
    } catch (error) {
        console.log(error);
    }
}
