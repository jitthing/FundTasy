import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import Toastify from "toastify-js";

export default function IncomeModal({ closeModal, setUserIncome, update }) {
  const handleSave = async (e) => {
    e.preventDefault();
    const { income } = e.target.elements;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/update_income`,
        { income: income.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response);
      setUserIncome(income.value);
      closeModal();
      update((prev) => !prev);
      Toastify({
        text: "Income updated!",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        offset: {
          y: 10,
        },
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "#4bb543",
          color: "#fff",
          boxShadow: "0px 0px 4px #888888",
          width: "fit-content",
          height: "48px",
          position: "absolute",
          left: "calc(50vw - 50px)",
          borderRadius: "6px",
          padding: "10px 15px",
          textAlign: "center",
          zIndex: "100",
        },
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Backdrop>
      <Container>
        <Head>Welcome to Fundtasy</Head>
        <div style={{ height: "40%" }}>
          Before you get started, we require some information to ensure the most
          accurate results are produced.
          <br />
          Please enter your monthly income to the nearest dollar.{" "}
        </div>
        <form onSubmit={handleSave}>
          <Label>
            Monthly Income{" "}
            <div style={{ display: "inline-block", fontWeight: "normal" }}>
              (nearest dollar)
            </div>
          </Label>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{ display: "inline-block", fontWeight: "bold" }}>$</div>
            <IncomeInput
              type="number"
              required
              name="income"
              min="1"
              step="1"
              placeholder="0"
            />
          </div>
          <Bottom>
            <SaveButton type="submit">Save</SaveButton>
          </Bottom>
        </form>
      </Container>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 50%;
  width: 40%;
  font-size: 18px;
  text-align: left;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;

const Head = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  height: 20%;
`;

const Label = styled.div`
  font-weight: bold;
  height: 10%;
`;

const IncomeInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ececec;
  &:focus {
    background-color: #fff;
    outline: 1px solid #cecece;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-top: auto;
`;

const SaveButton = styled.button`
  width: 60px;
  height: 40px;
  background-color: #645df2;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
`;
