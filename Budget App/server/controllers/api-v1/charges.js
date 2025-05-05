const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')
const multer = require('multer');

const upload = multer({ dest: './uploads/' }); // Save files to 'uploads/' directory
const csv = require('csv-parser');
const fs = require('fs');


router.get('/txns', authLockedRoute, async (req, res) => {
    try {
        console.log("getting txns")
        var user = res.locals.user;
        var transactions = await db.Transaction.find({owner: user.id});
        console.log(transactions)
        res.json({
            txns: transactions
        })
    } catch (error) {
        
    }
})

router.post('/addCSV', authLockedRoute, upload.single('chargesCSV'), async (req, res) => {
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
        console.log("Test")
        console.log(results)
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
            // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]        
        /*
        const newUser = new db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        // sign the user in 
        // create the jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }
        // sign the token and send it back 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 24 }) // expires in one day
        res.json({ token }) */
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