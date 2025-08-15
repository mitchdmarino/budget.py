import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, Navigate } from "react-router-dom";
import { login } from "../api/api";

// styled components
import styled from "styled-components";
import { Input, InputWrapper, Label, MainTitle } from "../styles/text";
import { DarkPageWrapper } from "../styles/divs";
import { PrimaryButton } from "../styles/buttons";

const LoginCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    width: 500px;
    margin: auto;
    height: 400px;
`;

const WarningMessage = styled.p`
    color: red;
`;

export default function Login({ currentUser, setCurrentUser }) {
    // state for the controlled form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // post form data to the backend
            const loginData = {
                email,
                password,
            };
            const response = await login(loginData);
            // save the token in localstorage
            const { token } = response.data;
            localStorage.setItem("jwt", token);
            // decode the token
            const decoded = jwt_decode(token);
            // set the user in App's state to be the decoded token
            setCurrentUser(decoded);
        } catch (err) {
            console.warn(err);
            if (err.response) {
                if (err.response.status === 400) {
                    setMsg(err.response.data.msg);
                }
            }
        }
    };

    // conditionally render a navigate component
    if (currentUser) {
        return <Navigate to="/profile" />;
    }

    return (
        <DarkPageWrapper>
            <LoginCard>
                <MainTitle>Login</MainTitle>
                <WarningMessage> {msg}</WarningMessage>
                <form onSubmit={handleSubmit}>
                    <InputWrapper>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="example@domain.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputWrapper>
                    <PrimaryButton type="submit">Login</PrimaryButton>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Click Here to get started.</Link>
                </p>
            </LoginCard>
        </DarkPageWrapper>
    );
}
