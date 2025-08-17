import { useState } from "react";
import "./PopUp.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Category from "../categories/Category";
import Typography from "@mui/material/Typography";
import PopUpBox from "./PopUpBox";

export default function PopUp({ open, onClose, category, setCategories }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <PopUpBox
                category={category}
                setCategories={setCategories}
                onClose={onClose}
            />
        </Modal>
    );
}
