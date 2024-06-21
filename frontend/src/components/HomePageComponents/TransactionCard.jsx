import * as React from "react";
import styled from "styled-components";

export default function TransactionCard() {
    return (
        <TransactionContainer>
          <TransactionHead>
            <div>Transactions</div>
            <a href="/transactions" style={{ fontWeight:"normal", color:"#645df2" }}>See all</a>
          </TransactionHead>
          <TransactionBody>
            <TransactionInfo>
              <div>Dinner with friends</div>
              <div style={{ color:"grey" }}>21:33</div>
            </TransactionInfo>
            <TransactionAmount>-$12.00</TransactionAmount>
          </TransactionBody>
          <TransactionBody>
            <TransactionInfo>
              <div>HEAP deposit</div>
              <div style={{ color:"grey" }}>29 Apr 2024</div>
            </TransactionInfo>
            <TransactionAmount>-$30.00</TransactionAmount>
          </TransactionBody>
        </TransactionContainer>
    )
}



const TransactionContainer = styled.div`
  height: 22vh;
  width: 25vw;
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
  height: 50px;
  width: 100%;
  padding: 5px 0px;
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