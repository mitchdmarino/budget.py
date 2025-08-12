import PopUp from "./PopUp"
import { useState } from "react";

export default function Category ({category, setCategories}) {
    const [popUp, setPopUp] = useState(false); 

    const handleClose = () => {
        setPopUp(false); 
    }
    
    const handleOpen = () => {
        setPopUp(true); 
    }

    return (
        <div className="category-element" >
                <p onClick={handleOpen} style={{border: '2px solid ' + category.color}}>{category.name}</p>
                <PopUp open={popUp} onClose={handleClose} category={category} setCategories={setCategories}/> 
        </div>
    )
}