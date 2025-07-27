import { useState } from "react";
import Box from "@mui/material/Box"
import { createTransaction, updateTransaction } from "../../api/api";
import { useEffect } from "react";

export default function PopUpBox ({sx, txn, date, setTxns, setPopUp}) {
    const [editMode, setEditMode] =useState (true); 
    const [existingTxn, setExistingTxn] = useState(false); // determines whether we are creating or reading/updating 
    const [transactionUpdate, setTransactionUpdate] = useState({}); // for the user post/put 

    useEffect(() => {
        var tempDate; 
        // if there is an existing txn, no need to do anything special 
        if (txn) {
            setExistingTxn(true); 
            setTransactionUpdate({
                ...txn, 
                txnDate: new Date(date).toISOString().substring(0,10), 
            })
            setEditMode(false); 
        } else {
            // then we are using this to create a new transaction 
            setExistingTxn(false); 
            setEditMode(true); 
            setTransactionUpdate({
                txnDate: new Date().toISOString().substring(0,10), 
                description: "", 
                amount: 0, 
                category: null, 
            })
        }

    }, [])

    

    const handleDateChange = (e) => {
        setTransactionUpdate({
            ...transactionUpdate, 
            txnDate: e.target.value, 
        })
    }
    const handleDescriptionChange = (e) => {
        setTransactionUpdate({
            ...transactionUpdate, 
            description: e.target.value, 
        })
    }
    const handleAmountChange = (e) => {
        setTransactionUpdate({
            ...transactionUpdate, 
            amount: e.target.value, 
        })
    }
    const handleCategoryChange = () => {

    }
    const handleSubmit = async () => {
        if (existingTxn) {
            const getUpdatedTxns = async () => {
                let response = await updateTransaction(localStorage, transactionUpdate); 
                console.log(response)
                setTxns(response.data.transactions);  
            }
            await getUpdatedTxns(); 
        } else {
            // create the new txn; 
            const createTxn = async () => {
                let response = await createTransaction(localStorage, transactionUpdate); 
                console.log(response); 
                setTxns(response.data.transactions); 
            }
            await createTxn(); 
        }
        setEditMode(false); 
        setPopUp(false); 
    }

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
        if (!existingTxn) {
            // exit the popup 
            setPopUp(false); 
        } else {
           
        }
    }
    return (
        editMode ? (
            <Box sx={sx} className="edit-mode">
                <input className="transaction-date transaction-detail" type="date" value={transactionUpdate.txnDate} onChange={handleDateChange}/>
                <input className="transaction-description transaction-detail" type="text" value={transactionUpdate.description} onChange={handleDescriptionChange} /> 
                <input className="transaction-amount transaction-detail" type="number" value={transactionUpdate.amount} onChange={handleAmountChange} /> 
                <button onClick={handleEditButtonClick}>BACK</button>
                <button onClick={handleSubmit}>Submit</button>
            </Box>
        ) : (
            <Box sx={sx} className="read-mode">
                <div className="transaction-date transaction-detail">{date}</div>
                <div className="transaction-description transaction-detail">{txn.description}</div>
                <div className="transaction-amount transaction-detail">${txn.amount}</div>
                <button onClick={handleEditButtonClick}>EDIT</button>
            </Box>
        )
    )
}