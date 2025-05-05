import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Profile({currentUser, handleLogout}) {
    // state for the secret message (aka user privileged data )
    const [msg, setMsg] = useState('')
    const [chargesCSV, setChargesCSV] = useState(null);
    // useEffect for getting the user data and checking auth 
    /*useEffect(() => {
        const getMessage = async () => {
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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
                // set the secret user message in state 
                setMsg(response.data.msg)
    
            } catch (err) {
                // if the error is 401, the auth failed
                console.warn(err)
                if(err.response) {
                    if (err.response.status===401) {
                        handleLogout()
                    }
                }
            }
        }
        getMessage()
    })*/
    const handleChange = (e) => {
        setChargesCSV(e.target.files[0]);
        };
    const handleUpload = async () => {
        if (!chargesCSV) return; 
        const formData = new FormData();
        formData.append('chargesCSV', chargesCSV);
        try {
            // get the token from local storage 
            const token = localStorage.getItem('jwt')
            // make the auth headers 
            const options = {
                headers: {
                    'Authorization': token, 
                    'Content-Type': "multipart/form-data"
                }
            }
            // hit the auth locked endpoint
            console.log(chargesCSV)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/charges/addCSV`, formData, options)
            
            console.log("Succesfully sent the file to the server");
            

        } catch (err) {
            // if the error is 401, the auth failed
            console.warn(err)
            if(err.response) {
                if (err.response.status===401) {
                    handleLogout()
                }
            }
        }
    }
    
    return (

        <div>
            <h1>Hello {currentUser.name}</h1>
            
            <p>Email: {currentUser.email}</p>

            <h2>Here is the secret message that is only available to users of User App: </h2>

            <h3>{msg}</h3>

            <div><p>Upload your charges csv file Here</p>
                <div><input type="file" onChange={handleChange} /><button onClick={handleUpload}>Upload</button></div>
            </div>


        </div>
    )
}