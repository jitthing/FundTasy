import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import styled from "styled-components";
import Toastify from "toastify-js";
import getTransactions from "../../utils/getTransactions";

export default function BarChartCard({ income }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionResponse = await getTransactions();
        setTransactions(transactionResponse.transactions);
      } catch (error) {
        Toastify({
          text: `Failed to fetch transactions: ${error}`,
          duration: 2000,
          gravity: "top",
          position: "center",
          offset: {
            y: 10 
          },
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "red",
            color: "#fff",
            boxShadow: "0px 0px 4px #888888",
            width: "450px",
            height: "48px",
            position: "absolute",
            left: "calc(50vw - 50px)",
            borderRadius: "6px",
            padding: "10px",
            textAlign: "center",
            zIndex: "100"
          }
        }).showToast();
      }
    };
    fetchTransactions();
  }, []);

  return (
    <ChartContainer>
      <ChartHead>Savings</ChartHead>
      <HorizontalBars transactions={transactions} income={income} />
    </ChartContainer>
  );
}

function HorizontalBars({ transactions, income }) {
  const dataset = [];

  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthNow = new Date().getMonth();
  const day = new Date().getDate();
  for (let i = 2; i >= 0; i--) {
    var m = monthNow - i < 0 ? 12 - monthNow : monthNow - i;
    var totalSavings = i === 0 ? (income * day) / 30 : income;
    for (let j = 0; j < transactions.length; j++) {
      if (new Date(transactions[j].date).getMonth() === m) {
        totalSavings -= transactions[j].amount;
      }
    }
    dataset.push({
      month: monthNames[m],
      savings: totalSavings,
    });
  }

  const chartSetting = {
    xAxis: [
      {
        label: "Savings ($)",
      },
    ],
    width: 400,
    height: 150,
  };

  const valueFormatter = (value) => `$${value}`;
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        {
          dataKey: "savings",
          label: "Monthly Savings",
          color: "#645df2",
          valueFormatter,
        },
      ]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}

const ChartContainer = styled.div`
  height: 22vh;
  width: 51%;
  border-radius: 8px;
  box-shadow: 0px 0px 2px #bcbcbc;
  padding: 5px 20px;
`;

const ChartHead = styled.div`
  position: absolute;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
  max-height: 35px;
`;
