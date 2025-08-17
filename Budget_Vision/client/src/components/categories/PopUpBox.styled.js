import styled from "styled-components";

export const ModalBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-width: 90%;
    height: 400px;
    background-color: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
    padding: 100px 0px;
`;

export const Input = styled.input`
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    width: ${({ type }) => (type === "color" ? "50px" : "70%")};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary}33;
    }
`;

export const HiddenColorInput = styled.input`
    width: 1px;
    height: 1px;
    border: none;
    padding: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

export const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    color: #fff;
    background: ${({ variant, theme }) =>
        variant === "delete"
            ? theme.colors.primary
            : variant === "back"
            ? theme.colors.border
            : theme.colors.primary};
    transition: background 0.2s ease;

    &:hover {
        background: ${({ variant, theme }) =>
            variant === "delete"
                ? "#c53030"
                : variant === "back"
                ? theme.colors.secondary
                : theme.colors.primary};
    }
`;

export const ColorInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const ColorPreview = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ color }) => color || "#000"};
`;
