import styled from "styled-components";

// Modal container
export const ModalBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 90%;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

// Shared styles for inputs and read-only divs
export const TransactionDetail = styled.input`
    display: block;
    width: 80%;
    padding: 12px 15px;
    font-size: 1.2rem;
    text-align: center;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary}33;
        outline: none;
    }
`;

export const TransactionDetailRead = styled.div`
    display: block;
    width: 80%;
    padding: 12px 15px;
    font-size: 1.2rem;
    text-align: center;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

// Buttons
export const Button = styled.button`
    background-color: ${({ color, theme }) => color || theme.colors.primary};
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 5px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ hoverColor, theme }) =>
            hoverColor || theme.colors.primaryDark};
    }
`;

export const DeleteButton = styled.button`
    background-color: ${({ color, theme }) => color || theme.colors.secondary};
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 5px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ hoverColor, theme }) =>
            hoverColor || theme.colors.primaryDark};
    }
`;

// Container for buttons
export const ButtonRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`;
