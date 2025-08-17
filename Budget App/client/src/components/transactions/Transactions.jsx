import { useState, useEffect } from "react";
// api
import { getTransactions, getCategories } from "../../api/api";
import TransactionList from "./TransactionList";
import UploadTransactionsForm from "./UploadTransactionsForm";

export default function Transactions() {
    const [txns, setTxns] = useState([]);
    const [categories, setCategories] = useState([]);

    // useEffect for getting the user data and checking auth
    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const TransactionsResponse = await getTransactions(
                        localStorage
                    );
                    const CategoriesResponse = await getCategories(
                        localStorage
                    );
                    let myTransactions = TransactionsResponse.data.transactions;
                    setTxns(myTransactions);
                    let myCategories = CategoriesResponse.data.categories;
                    setCategories(myCategories);
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
            fetchData();
        },
        [],
        () => {
            console.log("WE ARE UNMOUNTING TRANSACTIONS");
        }
    );

    if (!txns || txns.length === 0) {
        return (
            <div>
                <UploadTransactionsForm setTxns={setTxns} />
            </div>
        );
    }

    return (
        <TransactionList
            transactions={txns}
            setTxns={setTxns}
            categories={categories}
        />
    );
}
