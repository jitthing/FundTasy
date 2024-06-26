import * as React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import styled from "styled-components";

export default function BarChartCard() {
    return (
        <ChartContainer>
            <ChartHead>Savings</ChartHead>
            <HorizontalBars />
        </ChartContainer>
    )
}

function HorizontalBars() {

    const chartSetting = {
        xAxis: [
          {
            label: 'Savings ($)',
          },
        ],
        width: 400,
        height: 150,
      };
    
    const dataset = [
        {
            month:'Apr',
            savings: 217
        },
        {
            month: 'May',
            savings: 434
        }, 
        {
            month: 'Jun',
            savings: 89
        }
    ]
    
    const valueFormatter = (value) => `$${value}`;
    return (
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'savings', label:'Monthly Savings', color:'#645df2', valueFormatter }]}
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
`

const ChartHead = styled.div`
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    max-height: 35px;
`