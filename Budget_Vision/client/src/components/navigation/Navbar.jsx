import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar({ currentUser, handleLogout }) {
    const loggedIn = (
        <NavLinks>
            <StyledLink to="/profile">Home</StyledLink>
            <StyledLink to="/txns">Spending</StyledLink>
            <StyledLink to="/categories">My Categories</StyledLink>
            <StyledLink to="/" onClick={handleLogout}>
                Logout
            </StyledLink>
        </NavLinks>
    );

    const loggedOut = (
        <NavLinks>
            <StyledLink to="/login">Sign in</StyledLink>
        </NavLinks>
    );

    return (
        <Nav>
            <Branding to="/">
                <Logo src="/Surplus_Logo.png" alt="Surplus Logo" />
                <BrandText>Budget Vision</BrandText>
            </Branding>
            {currentUser ? loggedIn : loggedOut}
        </Nav>
    );
}

const Nav = styled.nav`
    top: 0;
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 999;
`;

const Branding = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const Logo = styled.img`
    height: 40px;
    margin-right: 0.5rem;
`;

const BrandText = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLink = styled(Link)`
    margin-left: 1rem;
    text-decoration: none;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;
