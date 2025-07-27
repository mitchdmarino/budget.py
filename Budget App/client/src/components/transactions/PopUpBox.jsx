import { useState } from "react";
import Box from "@mui/material/Box"
import { updateTransaction } from "../../api/api";

export default function PopUpBox ({sx, txn, date, setTxns, setPopUp}) {
    const [editMode, setEditMode] =useState (false)
    var tempDate = new Date(date);
    tempDate=tempDate.toISOString().substring(0,10)
    //tempDate = tempDate.substring(0,10);
    const [transactionUpdate, setTransactionUpdate] = useState({
        _id: txn._id, 
        postDate: tempDate, 
        description: txn.description, 
        amount: txn.amount, 
        category: txn.category
    })

    const handleDateChange = (e) => {
        setTransactionUpdate({
            _id: txn._id, 
            postDate: e.target.value, 
            description: transactionUpdate.description, 
            amount: transactionUpdate.amount, 
            category: transactionUpdate.category
        })
    }
    const handleDescriptionChange = (e) => {
        setTransactionUpdate({
            _id: txn._id, 
            postDate: transactionUpdate.postDate, 
            description: e.target.value, 
            amount: transactionUpdate.amount, 
            category: transactionUpdate.category
        })
    }
    const handleAmountChange = (e) => {
        setTransactionUpdate({
            _id: txn._id, 
            postDate: transactionUpdate.postDate, 
            description: transactionUpdate.description,  
            amount: e.target.value, 
            category: transactionUpdate.category
        })
    }
    const handleCategoryChange = () => {

    }
    const handleSubmit = async () => {
        const getUpdatedTxns = async () => {
            let response = await updateTransaction(localStorage, transactionUpdate); 
            console.log(response)
            setTxns(response.data.transactions);  
        }
        await getUpdatedTxns(); 
        setEditMode(false); 
        setPopUp(false); 
    }

    const handleEditButtonClick = () => {
        setEditMode(!editMode); 
    }
    return (
        editMode ? (
            <Box sx={sx} className="edit-mode">
                <input className="transaction-date transaction-detail" type="date" value={transactionUpdate.postDate} onChange={handleDateChange}/>
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