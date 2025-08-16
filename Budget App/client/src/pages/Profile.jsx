import { useState } from "react";
import Inbox from "../components/inbox/Inbox";
import { uploadBankStatement } from "../api/api";
import styled from "styled-components";

const ProfileWrapper = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
`;

export const Avatar = styled.div`
    width: 80px;
    height: 80px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    font-weight: bold;
    margin: 0 auto 40px auto;
`;

export const ProfileInfo = styled.div`
    h2 {
        margin: 0;
        font-size: 1.5rem;
        font-family: ${({ theme }) => theme.fonts.heading};
    }

    p {
        margin: 0.25rem 0 0;
        color: ${({ theme }) => theme.colors.textLight};
    }
`;

export default function Profile({ currentUser, handleLogout }) {
    // user information, update user info
    const [userData, setUserData] = useState(
        currentUser || { name: "", email: "" }
    );

    return (
        <ProfileWrapper>
            <Avatar>{currentUser.name.slice(0, 1)}</Avatar>
            <ProfileInfo>
                <h1>{currentUser.name}</h1>

                <p>{currentUser.email}</p>
            </ProfileInfo>

            <Inbox />
        </ProfileWrapper>
    );
}
