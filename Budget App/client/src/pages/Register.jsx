import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, Navigate } from "react-router-dom";
// styles
import styled from "styled-components";
import { Input, InputWrapper, Label, MainTitle } from "../styles/text";
import { DarkPageWrapper, PrimaryContainer } from "../styles/divs";
// api
import { register } from "../api/api";
import { PrimaryButton, SecondaryButton } from "../styles/buttons";

const RegisterCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    max-width: 600px;
    margin: auto;
    height: 450px;
`;

const WarningMessage = styled.p`
    color: red;
`;

export default function Register({ currentUser, setCurrentUser }) {
    // state for the controlled form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setMsg("Password must be at least 6 characters!");
            return;
        }
        try {
            // post form data to the backend
            const registerData = {
                name,
                email,
                password,
            };
            // save the token in localstorage
            const response = await register(registerData);
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
    // if user is logged in, go to their profile page instead
    if (currentUser) {
        return <Navigate to="/profile" />;
    }

    return (
        <DarkPageWrapper>
            <RegisterCard>
                <MainTitle>Begin your budget journey</MainTitle>
                <WarningMessage> {msg}</WarningMessage>
                <form onSubmit={handleSubmit}>
                    <InputWrapper>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            placeholder="Monopoly Man"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="moremoney@billionaire.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <InputWrapper></InputWrapper>{" "}
                        <Label htmlFor="password">Choose a password</Label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InputWrapper>
                    <PrimaryButton type="submit">Register</PrimaryButton>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="/login">Click Here to sign in.</Link>
                </p>
            </RegisterCard>
        </DarkPageWrapper>
    );
}
