import "./Transactions.css"
import TransactionListComponent from "./TransactionListComponent";
import { useEffect, useState } from "react";

// set the initial month and year filter
const today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let dateRef = new Date(year, month, 1); // initial date filter

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function TransactionList({transactions}) {
    const [page, setPage] = useState(1);
    const [currentTransactions, setCurrentTransactions] = useState([]);
    const [dateFilter, setDateFilter] = useState(dateRef);

    useEffect(() => {
        // filter transactions for the selected date (using the month and year)
        let dateFilterStart = dateFilter;
        let dateFilterEnd = new Date(dateFilter.getFullYear(), dateFilter.getMonth()+1, 1);
        console.log(dateFilterStart, dateFilterEnd)
        // sort them (should move this to server side so we don't have to repeat each useEffect)
        transactions = transactions.sort((a, b) => new Date(a.txnDate)- new Date(b.txnDate)); 
        // only get the transactions in the current month 
        transactions = transactions.filter(transaction => {
            let thisDate = transaction.txnDate;
            return new Date(thisDate).getTime() >=new Date(dateFilterStart).getTime() && new Date(thisDate).getTime()< new Date(dateFilterEnd).getTime(); // don't include end date 
        })
        const itemsPerPage = 25;
        let end = itemsPerPage * page;
        let start = end - itemsPerPage;
        setCurrentTransactions(transactions.slice(start, end));
    }, [page, dateFilter])
    let transactionMap = currentTransactions.map(transaction => {
        return (
            <TransactionListComponent key={transaction._id} transaction={transaction} />
        )
    })
    
    const handleNextDate = () => {
        // goes to the next month 
        setDateFilter(new Date(dateFilter.getFullYear(), dateFilter.getMonth() + 1, 1));
    }
    const handlePrevDate = () => {
        // goes to the previous month 
        setDateFilter(new Date(dateFilter.getFullYear(), dateFilter.getMonth() - 1, 1));
    }
    const handleNextPage = () => {
        // if multiple pages (25+ txns, goes to next page)
        // only if there is another page 
        if (transactions.length / page >=1) setPage(page + 1);
    } 
    const handlePrevPage = () => {
        // if multiple pages (25+ txns, goes to the previous page)
        if (page >1) setPage(page -1);
    }

    const handleSetDate = (e) => {
        // user sets the date using date input, filter for that month/year 
        let date = e.target.value
        console.log(date);
        // month in UTC results in wrong month for other time zones (like PST )
        const [year, month] = date.split("-").map(Number);
        let selectedDate = new Date(year, month - 1, 1); // Local time
        console.log(selectedDate); 
        setDateFilter(selectedDate);  
    }

    // initial date for the month/year input
    let initialDate = dateFilter.getFullYear() + "-"; 
    // check if we need to add a 0 to the string 
    if (dateFilter.getMonth() + 1 <10) {
        initialDate += "0";     
    }
    initialDate += dateFilter.getMonth() + 1; 

    if (!transactions || transactions.length === 0) return null;
    return (
        <div className="transaction-list-container">
            <div className="transaction-date-selection">
                <button onClick={handlePrevDate}>{'<'}</button>
                <input className="month-selector" type="month" value={initialDate} onChange={handleSetDate}/> 
                <button onClick={handleNextDate}>{'>'}</button>
                
            </div>
            <div className="transaction-list">
                <div className="transaction-list-header">
                    <div className="transaction-date">Date</div>
                    <div className="transaction-description">Name</div>
                    <div className="transaction-amount">Amount</div>
                    <div className="transaction-category">Category</div>
                </div>
                {transactionMap}
            </div>
            <div className="page-selection">
                <button onClick={handlePrevPage}>{'<'}</button>
                <button onClick={handleNextPage}>{'>'}</button>
            </div>
        </div>
    )
}