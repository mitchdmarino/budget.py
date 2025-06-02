import TransactionListComponent from "./TransactionListComponent";
import { useEffect, useState } from "react";

export default function TransactionList({transactions}) {
    const [page, setPage] = useState(1);
    const [currentTransactions, setCurrentTransactions] = useState([]);
    const [monthFilter, setMonthFilter] = useState(null);
    const [yearFilter, setYearFilter] = useState(null);

    
    useEffect(() => {
        const itemsPerPage = 25;
        let end = itemsPerPage * page;
        let start = end - itemsPerPage;
        setCurrentTransactions(transactions.slice(start, end));
    }, [page])
    let transactionMap = currentTransactions.map(transaction => {
        return (
            <TransactionListComponent key={transaction._id} transaction={transaction} />
        )
    })
    
    const handleNextPage = () => {
        if (transactions.length / page >=1) setPage(page + 1);
    } 
    const handlePrevPage = () => {
        if (page >1) setPage(page -1);
    }

    if (!transactions || transactions.length === 0) return null;
    return (
        <>
            <div className="page-selection">
                <button onClick={handlePrevPage}>{'<'}</button>
                <button onClick={handleNextPage}>{'>'}</button>
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
        </>
    )
}