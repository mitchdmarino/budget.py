const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')
const multer = require('multer');

const upload = multer({ dest: './uploads/' }); // Save files to 'uploads/' directory
const csv = require('csv-parser');
const fs = require('fs');
const category = require('../../models/category');

// show all spending transactions
router.get('/', authLockedRoute, async (req, res) => {
    try {
        console.log("getting txns")
        const user = res.locals.user;
        let transactions = await db.Transaction.find({owner: user.id}).populate(category);
        res.json({
            transactions: transactions
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

// add a single transaction
router.post('/', authLockedRoute, async (req, res) => {
    try {
        console.log("adding a custom transaction");
        let newTransaction = req.body.transaction;
        newTransaction = await db.Transaction.create(newTransaction)
        newTransaction.save();
    } catch (error) {
        res.status(500).json(err)
    }
})

// Categorize a transaction
router.post('/category', authLockedRoute, async (req, res) => {
    try {
        let category = req.body.category
        let transaction = req.body.transaction;
        transaction = await db.Transaction.findByIdAndUpdate(transaction._id, {
            category: category._id
        })
        await transaction.save();
        console.log("post /spending/category: updated the transaction");
        category = await db.Category.findByIdAndUpdate(category._id, {
                $push: {transactions: transaction._id}
        })
        await category.save();
        console.log("post /spending/category: added the transaction to the category");
        res.json({
            transaction: transaction, 
            category: category
        });
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

router.post('/CSV', authLockedRoute, upload.single('chargesCSV'), async (req, res) => {
    try {
        var user = res.locals.user;
        if (!user) {
            // error
        }
        var file = req.file;
        if (!file) {
            // error
        }
        const results = [];
        function parseCSV(filePath) {
            console.log('parsingCSV')
            return new Promise((resolve, reject) => {
              
          
              fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log('done, returning results')
                console.log(results.length)
                resolve(results); // ✅ This makes await work!
            });
          })
        }
        await parseCSV(req.file.path);
        for (const result of results) {
            console.log(result['Post Date'])
            let newTxn = new db.Transaction({
                postDate: result['Post Date'], 
                txnDate: result['Transaction Date'], 
                description: result.Description, 
                amount: result.Amount,
                owner: user.id
            })
            await (newTxn.save());
            console.log("new transaction saved")
        };
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