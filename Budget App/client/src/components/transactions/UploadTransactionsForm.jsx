import { useState } from "react";
import styled from "styled-components";
import { uploadBankStatement } from "../../api/api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ModalBox, Button } from "./PopUp.styled";

const FileUploadWrapper = styled.div``;

export default function UploadTransactionsForm(setTransactions) {
    const [bankUpload, setBankUpload] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setBankUpload(e.target.files[0]);
    };
    const handleUpload = async () => {
        if (!bankUpload) return;
        try {
            const response = await uploadBankStatement(
                localStorage,
                bankUpload
            );
            setTransactions(response.data.transactions);
        } catch (err) {}
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleModalOpen = () => {
        setOpen(true);
    };
    return (
        <FileUploadWrapper>
            <button onClick={handleModalOpen}>Upload Statement</button>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="transaction-modal"
            >
                <ModalBox>
                    <h2>Upload a U.S. Bank Credit Card Statement</h2>
                    <input type="file" required onChange={handleChange} />
                    <Button onClick={handleUpload}>Submit</Button>
                </ModalBox>
            </Modal>
        </FileUploadWrapper>
    );
}
