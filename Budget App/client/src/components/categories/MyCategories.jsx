import { useState, useEffect } from "react";
import CategoryDisplay from "./CategoryDisplay";
import { getCategories } from "../../api/api";
import PopUp from "./PopUp";

import styled from "styled-components";

const AddButton = styled.button`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primaryDark};
    }
`;

const PageContainer = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    h1 {
        text-align: center;
        margin-bottom: 2rem;
    }

    .add-category-container {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }
`;

// Categories dashboard for the user.
// Here they can create, edit, or delete categories.
// They will also have an "inbox" of transactions
// that need a category assigned
export default function MyCategories() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: "", color: "" });
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [popUp, setPopUp] = useState(false);

    // useEffect for getting the user data and checking auth
    useEffect(() => {
        const retrieveCategories = async () => {
            try {
                // get the token from local storage
                const token = localStorage.getItem("jwt");
                // make the auth headers
                const options = {
                    headers: {
                        Authorization: token,
                    },
                };
                // hit the auth locked endpoint
                const response = await getCategories(localStorage);
                // set the secret user message in state
                let myCategories = response.data.categories;
                console.log(myCategories);
                setCategories(myCategories);
            } catch (err) {
                // if the error is 401, the auth failed
                console.warn(err);
                if (err.response) {
                    if (err.response.status === 401) {
                        //handleLogout()
                    }
                }
            }
        };
        retrieveCategories();
    }, []);

    const handleAddCategory = () => {
        setPopUp(true);
    };
    const handleAddCategoryClose = () => {
        setPopUp(false);
    };

    return (
        <PageContainer>
            <h1>Manage Categories</h1>
            <div className="add-category-container">
                <AddButton onClick={handleAddCategory}>
                    Add New Category
                </AddButton>
                <PopUp
                    open={popUp}
                    onClose={handleAddCategoryClose}
                    category={null}
                    setCategories={setCategories}
                    setPopUp={setPopUp}
                />
            </div>
            <CategoryDisplay
                categories={categories}
                setCategories={setCategories}
            />
        </PageContainer>
    );
}
