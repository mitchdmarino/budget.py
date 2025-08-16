import { useState } from "react";
import Box from "@mui/material/Box";
import {
    createTransaction,
    deleteTransaction,
    updateTransaction,
} from "../../api/api";
import { useEffect } from "react";
import CategorySelect from "../categories/CategorySelect";
import {
    ModalBox,
    TransactionDetail,
    TransactionDetailRead,
    Button,
    ButtonRow,
    DeleteButton,
} from "./PopUp.styled";

export default function PopUpBox({ sx, txn, date, setTxns, setPopUp }) {
    const [editMode, setEditMode] = useState(true);
    const [existingTxn, setExistingTxn] = useState(false); // determines whether we are creating or reading/updating
    const [transactionUpdate, setTransactionUpdate] = useState({}); // for the user post/put

    useEffect(() => {
        var tempDate;
        // if there is an existing txn, no need to do anything special
        if (txn) {
            setExistingTxn(true);
            setTransactionUpdate({
                ...txn,
                txnDate: new Date(date).toISOString().substring(0, 10),
            });
            setEditMode(false);
        } else {
            // then we are using this to create a new transaction
            setExistingTxn(false);
            setEditMode(true);
            setTransactionUpdate({
                txnDate: new Date().toISOString().substring(0, 10),
                description: "",
                amount: 0,
                category: null,
            });
        }
    }, []);

    const handleDateChange = (e) => {
        setTransactionUpdate({
            ...transactionUpdate,
            txnDate: e.target.value,
        });
    };
    const handleDescriptionChange = (e) => {
        setTransactionUpdate({
            ...transactionUpdate,
            description: e.target.value,
        });
    };
    const handleAmountChange = (e) => {
        setTransactionUpdate({
            ...transactionUpdate,
            amount: e.target.value,
        });
    };
    const handleCategoryChange = (e) => {
        setTransactionUpdate({
            ...transactionUpdate,
            category: e.target.value,
        });
    };
    const handleSubmit = async () => {
        if (existingTxn) {
            const getUpdatedTxns = async () => {
                let response = await updateTransaction(
                    localStorage,
                    transactionUpdate
                );
                console.log(response);
                setTxns(response.data.transactions);
            };
            await getUpdatedTxns();
        } else {
            // create the new txn;
            const createTxn = async () => {
                let response = await createTransaction(
                    localStorage,
                    transactionUpdate
                );
                console.log(response);
                setTxns(response.data.transactions);
            };
            await createTxn();
        }
        setEditMode(false);
        setPopUp(false);
    };

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
        if (!existingTxn) {
            // exit the popup
            setPopUp(false);
        } else {
        }
    };

    const handleDeleteTransaction = async () => {
        const deleteTxn = async () => {
            let response = await deleteTransaction(
                localStorage,
                transactionUpdate
            );
            console.log(response);
            setTxns(response.data.transactions);
        };
        await deleteTxn();
        setPopUp(false);
    };

    return (
        <ModalBox>
            {" "}
            {editMode ? (
                <>
                    <TransactionDetail
                        type="date"
                        value={transactionUpdate.txnDate}
                        onChange={handleDateChange}
                    />
                    <TransactionDetail
                        type="text"
                        value={transactionUpdate.description}
                        onChange={handleDescriptionChange}
                    />
                    <TransactionDetail
                        type="number"
                        value={transactionUpdate.amount}
                        onChange={handleAmountChange}
                    />
                    <CategorySelect
                        category={transactionUpdate.category}
                        handleCategoryChange={handleCategoryChange}
                    />
                    <ButtonRow>
                        <Button onClick={handleEditButtonClick}>Back</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </ButtonRow>
                </>
            ) : (
                <>
                    <TransactionDetailRead>{date}</TransactionDetailRead>
                    <TransactionDetailRead>
                        {txn.description}
                    </TransactionDetailRead>
                    <TransactionDetailRead>${txn.amount}</TransactionDetailRead>
                    <TransactionDetailRead>
                        {txn.category ? txn.category.name : ""}
                    </TransactionDetailRead>
                    <ButtonRow>
                        <Button onClick={handleEditButtonClick}>Edit</Button>
                        <DeleteButton onClick={handleDeleteTransaction}>
                            Delete
                        </DeleteButton>
                    </ButtonRow>
                </>
            )}
        </ModalBox>
    );
}
