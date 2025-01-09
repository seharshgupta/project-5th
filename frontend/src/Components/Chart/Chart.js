import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    // Prepare data for chart
    const incomeData = incomes.map(({ date, amount }) => ({
        date: dateFormat(date),
        amount,
    }));

    const expenseData = expenses.map(({ date, amount }) => ({
        date: dateFormat(date),
        amount,
    }));

    const data = {
        labels: incomeData.map((inc) => inc.date), // Labels are based on income dates
        datasets: [
            {
                label: 'Income',
                data: incomeData.map((inc) => inc.amount),
                backgroundColor: 'rgba(0, 255, 0, 0.5)', // Semi-transparent green
                borderColor: 'green',
                borderWidth: 2,
                tension: 0.2, // Smooth curves
                fill: false, // Don't fill the area under the line
            },
            {
                label: 'Expenses',
                data: expenseData.map((exp) => exp.amount),
                backgroundColor: 'rgba(255, 0, 0, 0.5)', // Semi-transparent red
                borderColor: 'red',
                borderWidth: 2,
                tension: 0.2, // Smooth curves
                fill: false, // Don't fill the area under the line
            }
        ]
    };

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;
