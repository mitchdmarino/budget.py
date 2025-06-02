export default function TransactionListComponent({transaction}) {
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
        <div className="transaction-list-component">
            <div className="transaction-date">{date}</div>
            <div className="transaction-description">{transaction.description}</div>
            <div className="transaction-amount">${transaction.amount}</div>
            <div className="transaction-category">{transaction.category}</div>
        </div>
    )
}