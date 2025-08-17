export const calculateSpending = (transactions) => {
    // return the total amount for these transactions
    var sum = 0.0;
    transactions.forEach((txn) => {
        sum += txn.amount;
    });
    return sum;
};

export const calculateCategorySpending = (transactions, category) => {
    // given a set of transactions, return the total amount spent on a certain category
    var sum = 0.0;
    transactions.forEach((txn) => {
        if (txn.category && category && txn.category._id === category._id) {
            sum += txn.amount;
        }
        // handle no category assignment
        if (!category) {
            if (!txn.category) {
                sum += txn.amount;
            }
        }
    });
    return sum;
};

export const calculateSpendingToday = (transactions, day) => {
    // given a set of transactions, query for the specified day and add the total amount spent
    var sum = 0.0;
    transactions = transactions.forEach((txn) => {
        console.log(day);
        console.log(transactions.txnDate);
        console.log("comparing the transaction date to today");
        if (txn.txnDate == day) {
            sum += txn.amount;
        }
    });
    return sum;
};

export const genMonthlyBarChartData = (transactions, categories) => {
    const yLabels = categories.map((c) => c.name).concat("Uncategorized");

    const values = categories.map((category) =>
        calculateCategorySpending(transactions, category)
    );

    const colors = categories.map((c) => c.color);

    /// handle uncategorized
    values.push(calculateCategorySpending(transactions, null));
    colors.push("black");

    const yAxis = [
        {
            scaleType: "band",
            data: yLabels,
            colorMap: { type: "ordinal", colors: colors },
        },
    ];
    const series = [
        {
            data: values,
            barSize: 30,
            colorByPoint: true,
        },
    ];
    console.log(series[0].data);
    return [yAxis, series];
};
