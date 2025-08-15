import styled from "styled-components";

export const MainTitle = styled.h1`
    font-family: ${({ theme }) => theme.fonts.main};
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
`;

export const Label = styled.label`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    margin-bottom: 0;
`;

export const Input = styled.input`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    transition: all 0.25s ease;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.placeholder};
    }
`;
