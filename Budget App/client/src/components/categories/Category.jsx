import PopUp from "./PopUp";
import { useState } from "react";
import styled from "styled-components";

const CategoryCard = styled.div`
    padding: 1rem;
    border-radius: 10px;
    border: 2px solid ${({ color }) => color || "#ccc"};
    background: ${({ theme }) => theme.colors.surface};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
`;

export default function Category({ category, setCategories }) {
    const [popUp, setPopUp] = useState(false);

    const handleClose = () => {
        setPopUp(false);
    };

    const handleOpen = () => {
        setPopUp(true);
    };

    return (
        <>
            <CategoryCard color={category.color} onClick={handleOpen}>
                {category.name}
            </CategoryCard>
            <PopUp
                open={popUp}
                onClose={handleClose}
                category={category}
                setCategories={setCategories}
            />
        </>
    );
}
