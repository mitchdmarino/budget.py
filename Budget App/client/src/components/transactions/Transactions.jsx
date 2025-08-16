import { useState, useEffect } from "react";
import styled from "styled-components";
// api
import { getTransactions } from "../../api/api";
import TransactionList from "./TransactionList";

export default function Transactions() {
    // state for the secret message (aka user privileged data )
    const [txns, setTxns] = useState([]);
    const [updateTrue, setUpdateTrue] = useState(false);

    // useEffect for getting the user data and checking auth
    useEffect(
        () => {
            const getTxns = async () => {
                try {
                    const TransactionsResponse = await getTransactions(
                        localStorage
                    );
                    let myTransactions = TransactionsResponse.data.transactions;
                    setTxns(myTransactions);
                } catch (err) {
                    // if the error is 401, the auth failed
                    console.warn(err);
                    if (err.response) {
                        if (err.response.status === 401) {
                            //handleLogout()
                        }
                    }
                }
            };
            getTxns();
        },
        [updateTrue],
        () => {
            console.log("WE ARE UNMOUNTING TRANSACTIONS");
        }
    );

    if (!txns || txns.length === 0) {
        return <div>Upload your Credit Card Statement to get started.</div>;
    }

    return (
        <TransactionList
            transactions={txns}
            setTxns={setTxns}
            setUpdateTrue={setUpdateTrue}
        />
    );
}
