import {useState, useEffect} from 'react'
import axios from 'axios'
import Inbox from '../inbox/Inbox';
import { uploadBankStatement } from '../../api/api';

export default function Profile({currentUser, handleLogout}) {
    // state for the secret message (aka user privileged data )
    const [bankUpload, setBankUpload] = useState(null);

    const handleChange = (e) => {
        setBankUpload(e.target.files[0]);
        };
    const handleUpload = async () => {
        if (!bankUpload) return; 
        try {
            await uploadBankStatement(localStorage, bankUpload); 
            

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

            <div><p>Upload your US Bank Credit Card Statement Here</p>
                <div><input type="file" onChange={handleChange} /><button onClick={handleUpload}>Upload</button></div>
            </div>

            <Inbox /> 

        </div>
    )
}