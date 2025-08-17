import { useState } from "react";
import PopUp from "./PopUp";
import {
    ListItem,
    Preview,
    DateText,
    Description,
    Amount,
    Category,
} from "./Transactions.styled";

export default function TransactionListItem({ transaction, setTxns }) {
    const [popUp, setPopUp] = useState(false);
    var date = transaction.txnDate;
    date = new Date(date);
    date =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    const handleOpen = () => {
        setPopUp(true);
    };
    const handleClose = () => {
        setPopUp(false);
    };

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(transaction.amount);

    return (
        <ListItem>
            <Preview onClick={handleOpen}>
                <DateText>{date}</DateText>
                <Description>{transaction.description}</Description>
                <Amount amount={transaction.amount}>{formattedAmount}</Amount>
                {transaction.category && (
                    <Category color={transaction.category.color}>
                        {transaction.category.name}
                    </Category>
                )}
            </Preview>
            <PopUp
                open={popUp}
                onClose={handleClose}
                txn={transaction}
                date={date}
                setTxns={setTxns}
                setPopUp={setPopUp}
            />
        </ListItem>
    );
}
