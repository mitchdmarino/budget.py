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
    return await createBaseCategories(this);
};

UserSchema.methods.getCategories = function () {
    return mongoose
        .model("Category")
        .find({ owner: this.id })
        .populate("transactions");
};

// create base categories
UserSchema.pre("save", async function (next) {
    if (this.isNew) {
        await createBaseCategories(this);
    }
    next();
});

async function createBaseCategories(user) {
    try {
        const cat1 = await createCategory("Grocery", "#f52f2f", user);
        const cat2 = await createCategory("Restaurants", "#32a852", user);
        const cat3 = await createCategory("Entertainment", "#e82ff5", user);
        const cat4 = await createCategory("Fitness", "#322ff5", user);
        const cat5 = await createCategory("Rent", "#ecf711", user);
        return [cat1, cat2, cat3, cat4, cat5];
    } catch (error) {
        console.log(error);
    }
}

async function createCategory(name, color, user) {
    try {
        const newCategory = new mongoose.model("Category").create({
            name: name,
            owner: user,
            color: color,
        });
        //await newCategory.save();
        await user.categories.push(newCategory.id);
        return newCategory;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model("User", UserSchema);
