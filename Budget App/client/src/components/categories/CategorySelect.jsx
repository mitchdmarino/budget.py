import {useState, useEffect} from 'react'
import axios from 'axios'

export default function CategorySelect({category, setNewCategory, handleCategoryChange}) {
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

    let showCategories = categories.map(cat => {
        return (
            <option style={{border: '2px solid ' + cat.color}} value={cat._id} key={cat.id}>{cat.name}</option>
        )
    })

    const handleSelection = async (selectedOption, actionMeta) => {
        await setNewCategory(selectedOption.target.value);
        //console.log(`Action: ${actionMeta.action}`);
      };
    
    return (

        <div>
            {category ? <><label htmlFor="cats"></label>
            <select id="cats" onChange={handleCategoryChange} value={category._id}>
                {showCategories}
            </select></> : <><label htmlFor="cats"></label>
            <select id="cats" onChange={handleCategoryChange} >
                {showCategories}
            </select></>}
        </div>
    )
}