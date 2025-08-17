import { useState } from "react";
import Category from "./Category";
import styled from "styled-components";

const CategoryList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
`;

export default function CategoryDisplay({ categories, setCategories }) {
    var categoryMap = categories.map((category) => {
        return (
            <Category
                key={category._id}
                category={category}
                setCategories={setCategories}
            />
        );
    });
    return <CategoryList className="category-list">{categoryMap}</CategoryList>;
}
