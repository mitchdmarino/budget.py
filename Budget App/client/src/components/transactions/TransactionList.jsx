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
        let dateFilterStart = dateFilter
        let dateFilterEnd = new Date(dateFilter.getFullYear(), dateFilter.getMonth()+1, 1);
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
        setDateFilter(new Date(dateFilter.getFullYear(), dateFilter.getMonth() + 1, 1));
    }
    const handlePrevDate = () => {
        setDateFilter(new Date(dateFilter.getFullYear(), dateFilter.getMonth() - 1, 1));
    }
    const handleNextPage = () => {
        if (transactions.length / page >=1) setPage(page + 1);
    } 
    const handlePrevPage = () => {
        if (page >1) setPage(page -1);
    }

    if (!transactions || transactions.length === 0) return null;
    return (
        <div className="transaction-list-container">
            <div className="transaction-date-selection">
                <button onClick={handlePrevDate}>{'<'}</button>
                <h1>{months[dateFilter.getMonth()]} {dateFilter.getFullYear()}</h1>
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