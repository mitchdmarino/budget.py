import { useState } from "react";
import Box from "@mui/material/Box"
import { createCategory, deleteCategory, updateCategory } from "../../api/api";
import { useEffect } from "react";

export default function PopUpBox ({sx, category, setCategories, onClose}) {
    const [editMode, setEditMode] = useState (true); 
    const [existingCategory, setExistingCategory] = useState(false); // determines whether we are creating or reading/updating 
    const [categoryUpdate, setCategoryUpdate] = useState({name: "", color: "#000000"}); // for the user post/put 

    useEffect(() => {
        if (category) {
            setExistingCategory(true); 
            setCategoryUpdate(category)
            setEditMode(false); 
        } else {
            // then we are using this to create a new Category 
            setExistingCategory(false); 
            setEditMode(true); 
            setCategoryUpdate({
                name: "", 
                color: "#000000", 
            })
        }

    }, [])

    

    const handleNameChange = (e) => {
        setCategoryUpdate({
            ...categoryUpdate, 
            name: e.target.value, 
        })
    }
    const handleColorChange = (e) => {
        setCategoryUpdate({
            ...categoryUpdate, 
            color: e.target.value, 
        })
    }
    
    const handleSubmit = async () => {
        if (existingCategory) {
            const getUpdatedCategories = async () => {
                let response = await updateCategory(localStorage, categoryUpdate); 
                console.log(response)
                setCategories(response.data.categories);  
            }
            await getUpdatedCategories(); 
        } else {
            // create the new Category; 
            const createCategoryAsync = async () => {
                let response = await createCategory(localStorage, categoryUpdate); 
                console.log(response); 
                setCategories(response.data.categories); 
            }
            await createCategoryAsync(); 
        }
        setEditMode(false); 
        onClose();  
    }

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
        if (!existingCategory) {
            // exit the popup 
            onClose();  
        } else {
           
        }
    }

    const handleDeleteCategory = async () => {
        const deleteCategoryAsync = async () => {
            let response = await deleteCategory(localStorage, categoryUpdate); 
            console.log(response)
            setCategories(response.data.categories); 
        }
        await deleteCategoryAsync(); 
        onClose(); 
    }

    return (
        editMode ? (
            <Box sx={sx} className="edit-mode">
                <input className="category-name category-detail" type="text" value={categoryUpdate.name} onChange={handleNameChange}/>
                <input className="category-color category-detail" type="color" value={categoryUpdate.color} onChange={handleColorChange} /> 
                <button onClick={handleEditButtonClick}>BACK</button>
                <button onClick={handleSubmit}>Submit</button>
            </Box>
        ) : (
            <Box sx={sx} className="read-mode">
                <div className="category-description category-detail">{category.name}</div>
                <div className="category-amount category-detail">
                    <div style={{backgroundColor:category.color, width: '10px', height: '10px'}}></div>
                </div>
                <button onClick={handleEditButtonClick}>EDIT</button>
                <button onClick={handleDeleteCategory}>DELETE</button> 
            </Box>
        )
    )
}