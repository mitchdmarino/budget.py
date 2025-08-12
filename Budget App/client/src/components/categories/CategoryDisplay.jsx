import { useState } from "react";
import Category from "./Category";

export default function CategoryDisplay({categories, setCategories}) {
    var categoryMap = categories.map((category) => {
        return (
            <Category key={category._id} category={category} setCategories={setCategories}/>
        )
    })
    return (
        <div className="category-list">
            {categoryMap}
        </div>
    )
}