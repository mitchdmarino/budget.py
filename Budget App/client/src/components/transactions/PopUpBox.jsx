import { useState } from "react";
import Box from "@mui/material/Box"

export default function PopUpBox ({sx, txn, date}) {
    const [editMode, setEditMode] =useState (false)
    var tempDate = new Date(date);
    tempDate=tempDate.toISOString().substring(0,10)
    //tempDate = tempDate.substring(0,10);
    const [transactionUpdate, setTransactionUpdate] = useState({
        postDate: tempDate, 
        description: txn.description, 
        amount: txn.amount, 
        category: txn.category
    })

    const handleDateChange = () => {

    }
    const handleDescriptionChange = () => {

    }
    const handleAmountChange = () => {

    }
    const handleCategoryChange = () => {

    }
    const handleSubmit = () => {

    }

    const handleEditButtonClick = () => {
        setEditMode(!editMode); 
    }
    return (
        editMode ? (
            <Box sx={sx} className="edit-mode">
                <input type="date" value={transactionUpdate.postDate} onChange={handleDateChange}/>
                <input type="text" value={transactionUpdate.description} onChange={handleDescriptionChange} /> 
                <input type="number" value={transactionUpdate.amount} onChange={handleAmountChange} /> 
                <button onClick={handleEditButtonClick}>BACK</button>
            </Box>
        ) : (
            <Box sx={sx} className="read-mode">
                <div className="transaction-date">{date}</div>
                <div className="transaction-description">{txn.description}</div>
                <div className="transaction-amount">${txn.amount}</div>
                <button onClick={handleEditButtonClick}>EDIT</button>
            </Box>
        )
    )
}