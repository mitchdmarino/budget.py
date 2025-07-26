import {useState, useEffect} from 'react'
import axios from 'axios'
import Inbox from '../inbox/Inbox';

export default function Profile({currentUser, handleLogout}) {
    // state for the secret message (aka user privileged data )
    const [chargesCSV, setChargesCSV] = useState(null);

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

            <div><p>Upload a transactions csv file here</p>
                <div><input type="file" onChange={handleChange} /><button onClick={handleUpload}>Upload</button></div>
            </div>

            <Inbox /> 

        </div>
    )
}