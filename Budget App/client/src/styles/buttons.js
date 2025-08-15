import styled from "styled-components";

export const PrimaryButton = styled.button`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border: none;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primaryDark};
    }
`;

export const SecondaryButton = styled.button`
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
`;
