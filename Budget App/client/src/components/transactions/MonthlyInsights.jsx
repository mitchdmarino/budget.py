import styled from "styled-components";
import {
    calculateSpending,
    genMonthlyBarChartData,
} from "../../helpers/monthlyStatistics";
import { BarChart } from "@mui/x-charts/BarChart";

const InsightsWrapper = styled.div`
    background: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    h1 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    .bar-chart-container {
        overflow-x: auto;
    }
`;

export default function MonthlyInsights({ transactions, date, categories }) {
    // show the total spent
    const spending = calculateSpending(transactions);
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(spending);

    // get the month's name from the date ;
    const month = new Date(date).toLocaleString("default", {
        month: "long",
    });

    // get the data for the bar chart
    const [yAxis, series] = genMonthlyBarChartData(transactions, categories);

    return (
        <InsightsWrapper>
            {categories && (
                <>
                    <h1>
                        You spent {formattedAmount} in {month}
                    </h1>
                    <BarChart
                        xAxis={[{ label: "Spending ($)" }]}
                        yAxis={[
                            {
                                ...yAxis[0],
                                width: 200, // extra space for long labels
                                tickLabelStyle: { fontSize: 14 },
                            },
                        ]}
                        series={series}
                        layout="horizontal"
                        height={50 * categories.length}
                        width={600}
                        barGapRatio={0} // remove gap within bars
                        categoryGapRatio={0.3} // space between rows
                        className="bar-chart-container"
                    />
                </>
            )}
        </InsightsWrapper>
    );
}
