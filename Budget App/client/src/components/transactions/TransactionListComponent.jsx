import { useState } from "react";
import Category from "../categories/Category";
import CategorySelect from "../categories/CategorySelect";
import { categorizeTransaction } from "../../api/api";

export default function TransactionListComponent({transaction}) {
    const [category, setCategory] = useState(transaction.category)

    //var desc = transaction.description || "";
    //var amount = transaction.amount || 0;  
    var date = transaction.txnDate;
    date = new Date(date);
    date = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();  
    
    const setNewCategory = async (category) => {
        console.log("Setting the new category")
        console.log(category)
        setCategory(category)
        await categorizeTransaction(localStorage, transaction, category)
    }
    
    return (
        <div className="transaction-list-component">
            <div className="transaction-date">{date}</div>
            <div className="transaction-description">{transaction.description}</div>
            <div className="transaction-amount">${transaction.amount}</div>
            <div className="transaction-category">
                {category ? <Category category={category} setNewCategory={setNewCategory}/> : <CategorySelect category={category} setNewCategory={setNewCategory}/>}</div>
        </div>
    )
}