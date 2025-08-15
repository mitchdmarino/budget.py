import styled from "styled-components";

export const DarkPageWrapper = styled.div`
    background: ${({ theme }) => theme.colors.primaryDark};
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10%;
`;
