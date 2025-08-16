import styled from "styled-components";

const InsightsWrapper = styled.div`
    background: ${({ theme }) => theme.colors.primary};
`;

export default function MonthlyInsights({ transactions }) {
    return <InsightsWrapper>Monthly Insights</InsightsWrapper>;
}
