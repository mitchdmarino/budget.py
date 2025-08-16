import { useState } from "react";
import styled from "styled-components";

const FileUploadWrapper = styled.div``;

export default function UploadTransactionsForm() {
    const [bankUpload, setBankUpload] = useState(null);

    const handleChange = (e) => {
        setBankUpload(e.target.files[0]);
    };
    const handleUpload = async () => {
        if (!bankUpload) return;
        try {
            await uploadBankStatement(localStorage, bankUpload);
        } catch (err) {
            // if the error is 401, the auth failed
            console.warn(err);
            if (err.response) {
                if (err.response.status === 401) {
                    handleLogout();
                }
            }
        }
    };
    return (
        <FileUploadWrapper>
            <p>Upload your US Bank Credit Card Statement Here</p>
            <div>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </FileUploadWrapper>
    );
}
