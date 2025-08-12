const router = require("express").Router();
const db = require("../../models");
const authLockedRoute = require("./authLockedRoute");

router.get("/", authLockedRoute, async (req, res) => {
    try {
        console.log("getting categories");
        var user = res.locals.user;
        var categories = await user.getCategories();
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
        });
        await newCategory.save();
        await user.categories.push(newCategory);
        await user.save();
        var categories = await user.getCategories();
        res.status(200).json({
            newCategory: newCategory,
            categories: categories,
        });
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

router.put("/:category_id", authLockedRoute, async (req, res) => {
    try {
        var user = res.locals.user;
        var category = req.body.category; // updated info
        console.log("CATEGORY FROM REQ: " + req.body.category);
        var categoryID = req.params.category_id;
        console.log(category.color);
        var categoryToUpdate = await db.Category.findByIdAndUpdate(
            categoryID,
            {
                name: category.name,
                color: category.color,
            },
            { new: true }
        );
        //if (categoryToUpdate) await categoryToUpdate.save();
        var categories = await user.getCategories();
        res.status(200).json({
            category: categoryToUpdate,
            categories: categories,
        });
    } catch (err) {
        console.warn(err);
        if (err.name === "ValidationError") {
            res.status(400).json({ msg: err.message });
        } else {
            // handle all other errors
            res.status(500).json({ msg: "server error 500 😡" });
        }
        res.status(500).json(err);
    }
});

router.delete("/:category_id", authLockedRoute, async (req, res) => {
    try {
        const user = res.locals.user;
        let category = await db.Category.findByIdAndDelete(
            req.params.category_id
        );
        var categories = await user.getCategories();
        res.status(200).json({
            category: category,
            categories: categories,
        });
    } catch (err) {
        console.warn(err);
        res.status(500).json(err);
    }
});
