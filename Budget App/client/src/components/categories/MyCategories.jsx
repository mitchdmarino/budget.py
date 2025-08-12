import { useState, useEffect } from "react";
import CategoryDisplay from "./CategoryDisplay";
import './Categories.css'
import { getCategories } from "../../api/api";
import PopUp from "./PopUp";
// Categories dashboard for the user. 
// Here they can create, edit, or delete categories. 
// They will also have an "inbox" of transactions 
// that need a category assigned 
export default function MyCategories() {
    const [categories, setCategories] = useState([]); 
    const [newCategory, setNewCategory] = useState({name: "", color: ""}); 
    const [showAddCategory, setShowAddCategory] = useState(false); 
    const [popUp, setPopUp] = useState(false); 

    // useEffect for getting the user data and checking auth 
    useEffect(() => {
        
        const retrieveCategories = async () => {
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
                const response = await getCategories(localStorage); 
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
        retrieveCategories()
    }, [])

    const handleAddCategory = () => {
        setPopUp(true); 
    }
    const handleAddCategoryClose = () => {
        setPopUp(false); 
    }

    return (
        <div className="manage-categories">
            <h1>Manage Categories</h1>
            <div className="add-category-container">
                <button onClick={handleAddCategory}>Add New Category</button>
                <PopUp open={popUp} onClose={handleAddCategoryClose} category={null} setCategories ={setCategories} setPopUp={setPopUp}/> 
            </div>
            <CategoryDisplay categories={categories} setCategories={setCategories}/> 
        </div>
    )
}