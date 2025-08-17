const router = require("express").Router();
const db = require("../../models");
const authLockedRoute = require("./authLockedRoute");
const multer = require("multer");

const upload = multer({ dest: "./uploads/" }); // Save files to 'uploads/' directory
const csv = require("csv-parser");
const { spawn } = require("child_process");
const fs = require("fs");

// show all spending transactions
router.get("/", authLockedRoute, async (req, res) => {
    try {
        console.log("getting txns");
        const user = res.locals.user;
        //let transactions = await db.Transaction.find({owner: user.id}).populate('category');
        let transactions = await user.getTransactions();
        res.status(200).json({
            transactions: transactions,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// add a single transaction
router.post("/", authLockedRoute, async (req, res) => {
    try {
        let user = res.locals.user;
        console.log("adding a custom transaction");
        let newTransaction = req.body.transaction;
        console.log(newTransaction);
        newTransaction.owner = res.locals.user.id;
        newTransaction = await db.Transaction.create(newTransaction);
        newTransaction.save();
        console.log("new txn: " + newTransaction);
        //await newTransaction.categorizeFromExistingTxns(user);
        let transactions = await user.getTransactions();
        //console.log(transactions)
        res.status(201).json({
            transactions: transactions,
            newTransaction: newTransaction,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update a transaction
router.put("/", authLockedRoute, async (req, res) => {
    try {
        console.log("updating my transaction");
        let user = res.locals.user;
        let transaction = req.body.transaction;
        console.log(transaction);
        console.log(transaction.category);
        if (transaction.category === "") transaction.category = null;
        transaction = await db.Transaction.findByIdAndUpdate(
            transaction._id,
            {
                postDate: transaction.postDate,
                description: transaction.description,
                amount: transaction.amount,
                category: transaction.category,
            },
            { new: true }
        );
        //await transaction.save();
        //if (transaction.category) await transaction.categorizeLikeTxns(user);
        let transactions = await user.getTransactions();
        //console.log(transactions)
        res.status(200).json({
            transactions: transactions,
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

// delete a transaction
router.delete("/:transaction_id", authLockedRoute, async (req, res) => {
    try {
        let user = res.locals.user;
        let transaction = await db.Transaction.findByIdAndDelete(
            req.params.transaction_id
        );
        console.log(transaction);
        let transactions = await user.getTransactions();
        //console.log(transactions)
        res.status(200).json({
            transactions: transactions,
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

/*
// Categorize a transaction
router.post("/category", authLockedRoute, async (req, res) => {
    try {
        //console.log("SEttiNG CAT" + category)
        let category = req.body.category;
        let transaction = req.body.transaction;
        transaction = await db.Transaction.findByIdAndUpdate(transaction._id, {
            category: category,
        });
        await transaction.save();
        console.log("post /spending/category: updated the transaction");
        category = await db.Category.findByIdAndUpdate(category, {
            $push: { transactions: transaction._id },
        });
        if (!category.color) {
            category.color = "blue";
        }
        await category.save();
        console.log(
            "post /spending/category: added the transaction to the category"
        );
        res.json({
            transaction: transaction,
            category: category,
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
*/

router.post(
    "/bank-upload",
    authLockedRoute,
    upload.single("bankUpload"),
    async (req, res) => {
        try {
            var user = res.locals.user;
            if (!user) {
                // error
            }
            var file = req.file;
            if (!file) {
                // error
            }

            const pdfPath = file.path;
            const csvPath = `${pdfPath}.csv`;

            // call the conversion to csv python script
            const py = spawn("python3", ["./bankToCSV.py", pdfPath, csvPath]);
            // Log Python standard output
            py.stdout.on("data", (data) => {
                console.log(`Python stdout: ${data.toString()}`);
            });

            // Log Python standard error
            py.stderr.on("data", (data) => {
                console.error(`Python stderr: ${data.toString()}`);
            });

            py.on("close", (code) => {
                if (code !== 0) {
                    console.error(`Python script exited with code ${code}`);
                    return res
                        .status(500)
                        .send("PDF to CSV conversion failed.");
                }
                const results = [];

                console.log("parsingCSV");
                fs.createReadStream(csvPath)
                    .pipe(csv())
                    .on("data", (result) => {
                        console.log(result["Post Date"]);
                        let newTxn = {
                            postDate: result["Post Date"],
                            txnDate: result["Transaction Date"],
                            description: result.Description,
                            amount: result.Amount,
                            owner: user.id,
                        };
                        results.push(newTxn);
                        console.log("new transaction added to results");
                    })
                    .on("end", async () => {
                        fs.unlinkSync(pdfPath);
                        fs.unlinkSync(csvPath);
                        for (const txnData of results) {
                            const txn = new db.Transaction(txnData);
                            await txn.save(); // triggers pre("save") hooks
                        }

                        let updatedTransactions = await user.getTransactions();
                        res.status(200).json({
                            msg: "Transactions successfully saved!",
                            transactions: updatedTransactions,
                        });
                    });
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
    }
);

module.exports = router;
