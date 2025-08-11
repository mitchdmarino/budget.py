const router = require("express").Router();
const db = require("../../models");
const authLockedRoute = require("./authLockedRoute");

router.get("/", authLockedRoute, async (req, res) => {
    try {
        console.log("getting categories");
        var user = res.locals.user;
        var categories = await db.Category.find({ owner: user.id });
        //console.log(categories)
        // if the user has no categories, let's create some for them
        if (categories.length === 0) {
            categories = createBaseCategories(user);
        }
        res.json({
            categories: categories,
        });
    } catch (error) {}
});

router.post("/", authLockedRoute, async (req, res) => {
    try {
        var user = res.locals.user;
        var category = req.body.category;
        let newCategory = new db.Category({
            name: category.name,
            color: category.color,
            owner: user.id,
            transactions: [],
        });
        await newCategory.save();
        await user.categories.push(newCategory);
        await user.save();
    } catch (err) {
        console.warn(err);
        // handle validation errors
        if (err.name === "ValidationError") {
            res.status(400).json({ msg: err.message });
        } else {
            // handle all other errors
            res.status(500).json({ msg: "server error 500 😡" });
        }
        res.status(500).json(err);
    }
});
module.exports = router;
