const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')



router.get('/', authLockedRoute, async (req, res) => {
    try {
        console.log("getting categories")
        var user = res.locals.user;
        var categories = await db.Category.find({owner: user.id});
        console.log(categories)
        // if the user has no categories, let's create some for them
        if (categories.length === 0) {
            categories = createBaseCategories(user);
        }
        res.json({
            categories: categories
        })
    } catch (error) {
        
    }
})

router.post('/', authLockedRoute, async (req, res) => {
    try {
        var user = res.locals.user;
        var category = req.body.category
        let newCategory = new db.Category({
                        name: category.name,
                        color: category.color,
                        owner: user.id,
                        transactions: []
                    })
                    await (newCategory.save());
        await user.categories.push(newCategory)
        await user.save()
    } catch (err) {
        console.warn(err)
        // handle validation errors
        if (err.name === 'ValidationError') {
            res.status(400).json({ msg: err.message })
        } else {
            // handle all other errors
            res.status(500).json({ msg: 'server error 500 😡' })
        }
        res.status(500).json(err)

    }
})
module.exports = router 

async function createBaseCategories(user) {
    try {
        const cat1 = await createCategory("Grocery", "red", user);
        const cat2 = await createCategory("Restaurants", "green", user);
        const cat3 = await createCategory("Entertainment", "purple", user); 
        const cat4 = await createCategory("Fitness", "blue", user);
        const cat5 = await createCategory("Rent", "black", user);
        return ([cat1, cat2, cat3, cat4, cat5]);
    } catch (error) {
        console.log(error);
    }
}

async function createCategory(name, color, user) {
    try {
        const newCategory = new db.Category({
            name: name,
            owner: user.id, 
            color: color
        })
        await newCategory.save()
        await user.categories.push(newCategory)
        await user.save()
        return newCategory();
    } catch (error) {
        console.log((error))
    }
}