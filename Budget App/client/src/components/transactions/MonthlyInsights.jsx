import styled from "styled-components";
import {
    calculateSpending,
    genMonthlyBarChartData,
} from "../../helpers/monthlyStatistics";
import { BarChart } from "@mui/x-charts/BarChart";

const InsightsWrapper = styled.div`
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
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
    console.log(date);
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
                    />
                </>
            )}
        </InsightsWrapper>
    );
}
