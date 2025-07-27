import {useState, useEffect} from 'react'
import Transaction from './Transaction'
//import CategoriesDisplay from '../categories/CategoryDisplay'

// api 
import { getCategories, getTransactions } from '../../api/api'
import TransactionList from './TransactionList';

export default function Transactions({currentUser}) {
    // state for the secret message (aka user privileged data )
    const [txns, setTxns] = useState([])
    const [updateTrue, setUpdateTrue] = useState(false); 
    const [categories, setCategories] = useState([])

    // useEffect for getting the user data and checking auth 
    useEffect(() => {
        const getTxns = async () => {
            try {
                const TransactionsResponse = await getTransactions(localStorage);
                let myTransactions = TransactionsResponse.data.transactions;
                const categoriesResponse = await getCategories(localStorage);
                let myCategories = categoriesResponse.data.categories;
                setTxns(myTransactions);
                setCategories(myCategories);
            } catch (err) {
                // if the error is 401, the auth failed
                console.warn(err)
                if(err.response) {
                    if (err.response.status===401) {
                        //handleLogout()
                    }
                }
            }
        }
        getTxns()
    }, [updateTrue], () => {
        console.log("WE ARE UNMOUNTING TRANSACTIONS?")
    })
    
    if (!txns || txns.length === 0) {
        return (<div>no transactions</div>)
    }
    const handleNull = () => {
        setTxns(null)
    }
    return (

        <div>
           {/*<Transaction currentUser={currentUser} transaction={txns[i]}/> 

            <button onClick={setTxns(null)}>Next</button>
            */}
            
            <TransactionList transactions={txns} setTxns={setTxns} setUpdateTrue={setUpdateTrue}/> 
        </div>
    )
}

