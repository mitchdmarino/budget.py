import { useState, useEffect } from "react";
import axios from "axios";
import { StyledSelect, SelectContainer } from "./CategorySelect.styled";

export default function CategorySelect({ category, handleCategoryChange }) {
    const [categories, setCategories] = useState([]);

    // useEffect for getting the user data and checking auth
    useEffect(() => {
        const getCategories = async () => {
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
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api-v1/categories`,
                    options
                );
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
        getCategories();
    }, []);

    return (
        <SelectContainer>
            <StyledSelect
                id="cats"
                onChange={handleCategoryChange}
                value={category ? category._id : ""}
            >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                    <option
                        style={{ border: "2px solid " + cat.color }}
                        value={cat._id}
                        key={cat._id}
                    >
                        {cat.name}
                    </option>
                ))}
            </StyledSelect>
        </SelectContainer>
    );
}
