import styled from "styled-components";

export const SelectContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;

export const StyledSelect = styled.select`
    width: 100%;
    padding: 12px 15px;
    font-size: 1.2rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    text-align: center;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary}33;
        outline: none;
    }

    option {
        padding: 10px;
        border: 1px solid transparent;
    }
`;
