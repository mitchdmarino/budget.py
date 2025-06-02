import {useState, useEffect} from 'react'
import Transaction from './Transaction'
//import CategoriesDisplay from '../categories/CategoryDisplay'

// api 
import { getCategories, getTransactions } from '../../api/api'
import TransactionList from './TransactionList';

export default function Transactions({currentUser}) {
    // state for the secret message (aka user privileged data )
    const [txns, setTxns] = useState([])
    const [i, setI] = useState(0);
    const [categories, setCategories] = useState([])
    
    const nextTransaction = () => {
        setI(i+1)
    }

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
    }, [])
    
    if (!txns || txns.length === 0) {
        return (<div>no transactions</div>)
    }

    return (

        <div>
           {/*<Transaction currentUser={currentUser} transaction={txns[i]}/> 

            <button onClick={nextTransaction}>Next</button>
            */}
            
            <TransactionList transactions={txns}/> 

        </div>
    )
}

