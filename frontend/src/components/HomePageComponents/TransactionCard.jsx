import * as React from "react";
import styled from "styled-components";
import formatCurrency from "../../utils/formatCurrency";
import formatTitle from "../../utils/formatTitle";
const moment = require("moment");



export default function TransactionCard({ transactions }) {
  return (
    <TransactionContainer>
      <TransactionHead>
        <div>Transactions</div>
        <a href="/transactions" style={{ fontWeight: "normal", color: "#645df2" }}>See all</a>
      </TransactionHead>
      {transactions.map((transaction, index) => (
        <TransactionBody key={index}>
          <TransactionInfo>
            <div>{formatTitle(transaction.title)}</div>
            <div style={{ color: "grey" }}>{moment(transaction.date).format("DD MMM YYYY HH:mm")}</div>
          </TransactionInfo>
          <TransactionAmount>{formatCurrency(transaction.amount)}</TransactionAmount>
        </TransactionBody>
      ))}
    </TransactionContainer>
  );
}


const TransactionContainer = styled.div`
  height: 22vh;
  width: 48%;
  border-radius: 8px;
  box-shadow: 0px 0px 2px #bcbcbc;
  padding: 10px 20px;
`

const TransactionHead = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  max-height: 35px;
`

const TransactionBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32%;
  width: 100%;
  padding: 25px 0px;
  font-size: 14px;
`

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`

const TransactionAmount = styled.div`
  font-size: 16px;
  text-align: right;
`