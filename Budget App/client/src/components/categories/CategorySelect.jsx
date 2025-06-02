import {useState, useEffect} from 'react'
import axios from 'axios'

export default function CategorySelect({currentUser, setCategory}) {
    // state for the secret message (aka user privileged data )
    const [categories, setCategories] = useState([])

    // useEffect for getting the user data and checking auth 
    useEffect(() => {
        
        const getCategories = async () => {
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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/categories`, options)
                // set the secret user message in state 
                let myCategories = response.data.categories;
                console.log('test')
                console.log(myCategories);
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
        getCategories()
    }, [])

    function showCategories() {
        // get the categories from state 
        categories.map((cat) => {
            <option value={cat} key={cat.id}>{cat}</option>
        })
    }
    const handleSelection = (selectedOption, actionMeta) => {
        setCategory(selectedOption);
        console.log(`Action: ${actionMeta.action}`);
      };
    
    return (

        <div>
            <label for="cats">Choose a category:</label>
            <select onChange={handleSelection}>{showCategories}</select>
        </div>
    )
}