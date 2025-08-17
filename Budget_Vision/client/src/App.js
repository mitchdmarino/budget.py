import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
// styled components
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { useState, useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/navigation/Navbar";
import jwt_decode from "jwt-decode";
//import "./App.css";
import Transactions from "./components/transactions/Transactions";
import MyCategories from "./components/categories/MyCategories";
import styled from "styled-components";

export const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    font-family: "Inter", "Roboto", sans-serif;
    padding: 1rem;

    // optional: center main content
    main {
        flex: 1;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
    }

    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }

    button {
        cursor: pointer;
        font-family: inherit;
    }
`;

function App() {
    // the currently logged in user will be stored in state
    const [currentUser, setCurrentUser] = useState(null);

    // useEffect -- if the user navigates away from the page, we will log them back in
    useEffect(() => {
        // check to see if token is in storage
        const token = localStorage.getItem("jwt");
        if (token) {
            // if so, we will decode it and set the user in app state
            setCurrentUser(jwt_decode(token));
        } else {
            setCurrentUser(null);
        }

        // if so, we will decode it and set the user in app state
    }, []);
    // event handler to log the user out when needed
    const handleLogout = () => {
        // check to see if a token exists in local storage
        if (localStorage.getItem("jwt")) {
            // if so, delete
            localStorage.removeItem("jwt");
            // set the user in app state to null
            setCurrentUser(null);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router>
                <header>
                    <Navbar
                        currentUser={currentUser}
                        handleLogout={handleLogout}
                    />
                </header>
                <AppWrapper>
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Welcome
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <Register
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <Login
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            />
                            <Route
                                path="/txns"
                                element={
                                    <Transactions
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            />
                            <Route
                                path="/categories"
                                element={
                                    <MyCategories
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            />
                            {/* TODO: conditionally render auth locked routes */}
                            <Route
                                path="/profile"
                                element={
                                    currentUser ? (
                                        <Profile
                                            currentUser={currentUser}
                                            handleLogout={handleLogout}
                                            setCurrentUser={setCurrentUser}
                                        />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                        </Routes>
                    </main>
                </AppWrapper>
            </Router>
        </ThemeProvider>
    );
}

export default App;
