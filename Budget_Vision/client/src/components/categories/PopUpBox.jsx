import { useState } from "react";
import {
    ModalBox,
    Input,
    ButtonGroup,
    Button,
    ColorInputWrapper,
    ColorPreview,
    HiddenColorInput,
} from "./PopUpBox.styled";
import { createCategory, deleteCategory, updateCategory } from "../../api/api";
import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function PopUpBox({ category, setCategories, onClose }) {
    const [editMode, setEditMode] = useState(true);
    const [existingCategory, setExistingCategory] = useState(false); // determines whether we are creating or reading/updating
    const [categoryUpdate, setCategoryUpdate] = useState({
        name: "",
        color: "#000000",
    }); // for the user post/put
    const colorInputRef = useRef(null);

    useEffect(() => {
        if (category) {
            setExistingCategory(true);
            setCategoryUpdate(category);
            setEditMode(false);
        } else {
            // then we are using this to create a new Category
            setExistingCategory(false);
            setEditMode(true);
            setCategoryUpdate({
                name: "",
                color: "#000000",
            });
        }
    }, []);

    const handleNameChange = (e) => {
        setCategoryUpdate({
            ...categoryUpdate,
            name: e.target.value,
        });
    };
    const handleColorChange = (e) => {
        setCategoryUpdate({
            ...categoryUpdate,
            color: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (existingCategory) {
            const getUpdatedCategories = async () => {
                let response = await updateCategory(
                    localStorage,
                    categoryUpdate
                );
                console.log(response);
                setCategories(response.data.categories);
            };
            await getUpdatedCategories();
        } else {
            // create the new Category;
            const createCategoryAsync = async () => {
                let response = await createCategory(
                    localStorage,
                    categoryUpdate
                );
                console.log(response);
                setCategories(response.data.categories);
            };
            await createCategoryAsync();
        }
        setEditMode(false);
        onClose();
    };

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
        if (!existingCategory) {
            // exit the popup
            onClose();
        } else {
        }
    };

    const handleDeleteCategory = async () => {
        const deleteCategoryAsync = async () => {
            let response = await deleteCategory(localStorage, categoryUpdate);
            console.log(response);
            setCategories(response.data.categories);
        };
        await deleteCategoryAsync();
        onClose();
    };

    return (
        <ModalBox>
            {editMode ? (
                <>
                    <Input
                        className="category-name category-detail"
                        type="text"
                        value={categoryUpdate.name}
                        onChange={handleNameChange}
                    />
                    <ColorInputWrapper>
                        <HiddenColorInput
                            type="color"
                            value={categoryUpdate.color}
                            onChange={handleColorChange}
                            ref={colorInputRef}
                        />
                        <ColorPreview
                            color={categoryUpdate.color}
                            onClick={() => colorInputRef.current.click()}
                        />
                    </ColorInputWrapper>
                    <ButtonGroup>
                        <Button variant="back" onClick={handleEditButtonClick}>
                            BACK
                        </Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </ButtonGroup>
                </>
            ) : (
                <>
                    <strong>{category.name}</strong>

                    <div
                        style={{
                            marginTop: "0.5rem",
                            width: "20px",
                            height: "20px",
                            backgroundColor: category.color,
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <ButtonGroup>
                        <Button variant="back" onClick={handleEditButtonClick}>
                            EDIT
                        </Button>
                        <Button variant="delete" onClick={handleDeleteCategory}>
                            DELETE
                        </Button>
                    </ButtonGroup>
                </>
            )}{" "}
        </ModalBox>
    );
}
