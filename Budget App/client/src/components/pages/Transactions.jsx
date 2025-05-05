import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Transactions({currentUser, handleLogout}) {
    // state for the secret message (aka user privileged data )
    const [txns, setTxns] = useState([])
    
    // useEffect for getting the user data and checking auth 
    useEffect(() => {
        console.log('test')
        const getTxns = async () => {
            try {
                // get the token from local storage 
                const token = localStorage.getItem('jwt')
                // make the auth headers 
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                // hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/charges/txns`, options)
                // set the secret user message in state 
                let myTransactions = response.data.txns;
                console.log('test')
                console.log(myTransactions);
                setTxns(myTransactions)
    
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
    
    
    return (

        <div>
            <h1>Hello</h1>
            
            <p>Email:</p>

            


        </div>
    )
}

