import styled from "styled-components";

export const TransactionListContainer = styled.div`
    max-width: 1500px;
    margin: 2rem auto;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

export const DateSelection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    button {
        background: ${({ theme }) => theme.colors.primary};
        border: none;
        color: #fff;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s ease;

        &:hover {
            background: ${({ theme }) => theme.colors.primaryDark};
        }
    }
`;

export const MonthYearInput = styled.input.attrs({ type: "month" })`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 1.7rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    outline: none;
    color: ${({ theme }) => theme.colors.text};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary}33;
    }

    /* Force the font on Chrome/Safari for the value text */
    &::-webkit-datetime-edit,
    &::-webkit-datetime-edit-text,
    &::-webkit-datetime-edit-month-field,
    &::-webkit-datetime-edit-year-field {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.text};
    }

    /* Calendar icon (optional) */
    &::-webkit-calendar-picker-indicator {
        filter: invert(0.5);
        cursor: pointer;
    }
`;

export const NewTransactionContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    button {
        background: ${({ theme }) => theme.colors.primary};
        border: none;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s ease;
        margin: 2px;

        &:hover {
            background: ${({ theme }) => theme.colors.primaryDark};
        }
    }
`;

export const TransactionListWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    overflow: hidden;
`;

export const TransactionHeader = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr 120px 150px;
    padding: 0.75rem 1rem;
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.textOnPrimary};
    font-weight: 600;
    font-size: 0.95rem;
`;

export const PageSelection = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;

    button {
        background: ${({ theme }) => theme.colors.primary};
        border: none;
        color: #fff;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s ease;

        &:hover {
            background: ${({ theme }) => theme.colors.primaryDark};
        }
    }
`;

// Individual Transaction List Items

export const ListItem = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${({ theme }) =>
            theme.colors.primary}15; /* 15% opacity of primary */
    transform: translateY(-2px); /* subtle lift effect */
`;

export const Preview = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr 120px 150px;
    align-items: center;
    padding: 0.75rem 1rem;
    background: ${({ theme }) => theme.colors.surface};
    cursor: pointer;
`;

export const DateText = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Description = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Amount = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: ${({ amount, theme }) =>
        amount < 0 ? theme.colors.negative : theme.colors.positive};
`;

export const Category = styled.div`
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
    justify-self: end;
    background-color: ${({ color, theme }) => color || theme.colors.border};
    color: white;
`;
