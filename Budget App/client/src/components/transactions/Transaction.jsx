import {useState, useEffect} from 'react'
import "./Transactions.css"

export default function Transaction({currentUser, transaction}) {
    // state for the secret message (aka user privileged data )
    if (!transaction) {
        return null;
    }
    var desc = transaction.description || "";
    var amount = transaction.amount || 0;  
    var category = transaction.category || "";
    var date = transaction.txnDate;
    date = new Date(date);
    date = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();    
    
    return (

        <div className='transaction-container'>
            <p className='transaction-title'>Transaction: {desc}</p>
            <p className='transaction-cost'>Charge: ${amount}</p>
            <p className='transaction-category'>{category}</p>
            <p className='transaction-date'>{date}</p>


        </div>
    )
}

