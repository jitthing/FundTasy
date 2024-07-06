import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getUser from "../utils/getUser";
import axios from "axios";
import truncateText from "../utils/truncateText";

/*
 TODO
 - Add a calendar pciker for the date
 - Create a banner instead of using alert
*/

export default function NewRecordForm({ closeForm, updateTransactions, allGoals, editTransaction }) {
  const [title, setTitle] = useState(editTransaction ? editTransaction.title : "");
  const [category, setCategory] = useState(editTransaction ? editTransaction.category : null);
  const [amount, setAmount] = useState(editTransaction ? editTransaction.amount : null);
  

  useEffect(() => {
    if (editTransaction) {
      setTitle(editTransaction.title);
      setCategory(editTransaction.category);
      setAmount(editTransaction.amount);
    }
  }, [editTransaction]);

  const createTransaction = async (formData) => {
    try {
      const userObj = await getUser();
      const username = userObj.user.username;
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/new_transaction",
        { formData, username }
      );
      // console.log(response.data);
      updateTransactions((prev) => !prev);
      alert("Transaction created!");
    } catch (error) {
      console.log("Error creating transaction: ", error);
      alert("Error creating transaction!");
    }
  };

  const updateTransaction = async (id, formData) => {
    try {
      const userObj = await getUser();
      const username = userObj.user.username;
      const response = await axios.put(
        `http://localhost:8000/edit_transaction/${id}`,
        { formData, username }
      );
      updateTransactions((prev) => !prev);
      alert("Transaction updated!");
    } catch (error) {
      console.log("Error updating transaction: ", error);
      alert("Error updating transaction!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, category, title } = e.target.elements;
    const formData = {
      title: title.value,
      category: category.value,
      // goal: goal.value,
      amount: amount.value,
    };
    try {
      if (editTransaction) {
        await updateTransaction(editTransaction._id, formData);
      } else {
        await createTransaction(formData);
      }
      closeForm();
    } catch (error) {
      console.log("Error creating transaction: ", error);
      alert("Error creating transaction!");
    }
  };
  return (
    <NewRecordBackdrop onClick={closeForm}>
      <NewRecordModal onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <NewRecordHead>
            <CloseIcon srcSet="icons/close.png" onClick={closeForm} />
            <NewRecordTitle>{editTransaction ? "Edit Record" : "New Record"}</NewRecordTitle>
          </NewRecordHead>
          <NewRecordBody>
            <FormBlock width="100%">
              <FormLabel>Title</FormLabel>
              <FormTextInput name="title" required placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </FormBlock>
            <FormBlock width="100%">
              <FormLabel>Category</FormLabel>
              <FormDropdown required name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <FormOption value="" disabled selected>Select Category</FormOption>
                <FormOption value='Food'>Food</FormOption>
                <FormOption value='Lifestyle'>Lifestyle</FormOption>
                <FormOption value='School'>School</FormOption>
                <FormOption value='Subscriptions'>Subscriptions</FormOption>
                <FormOption value='Others'>Others</FormOption>
              </FormDropdown>
            </FormBlock>

            <FormBlock width="100%">
              <FormLabel>Amount</FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div style={{ display: "inline-block", fontWeight: "bold" }}>
                  $
                </div>
                <FormTextInput
                  type="number"
                  required
                  name="amount"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </FormBlock>
          </NewRecordBody>
          <FormBottom>
            <FormSubmit type="submit">{editTransaction ? "Update" : "Submit"}</FormSubmit>
          </FormBottom>
        </form>
      </NewRecordModal>
    </NewRecordBackdrop>
  );
}

const NewRecordBackdrop = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 20vw;
  width: 80vw;
  min-height: 100vh;
  max-height: 100%;
  background-color: #00000080;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewRecordModal = styled.div`
  width: 60%;
  height: 90%;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;

const CloseIcon = styled.img`
  height: 16px;
  width: 16px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
  }
`;

const NewRecordHead = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewRecordTitle = styled.div`
  width: calc(100% - 20px);
  font-size: 20px;
  font-weight: bold;
`;

const NewRecordBody = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0px;
`;

const FormBlock = styled.div`
  width: ${(props) => props.width};
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10x;
`;

const FormLabel = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`;

const FormTextInput = styled.input`
  width: 90%;
  height: 40px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ececec;
  &:focus {
    background-color: #fff;
    outline: 1px solid #cecece;
  }
`;

const FormDropdown = styled.select`
  width: 90%;
  height: 40px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ececec;
  &:focus {
    background-color: #fff;
    outline: 1px solid #cecece;
  }
  display: block;
  color: grey;
`;

const FormOption = styled.option`
  height: 30px;
  width: 100%;
  font-size: 16px;
  color: black;
`;

const FormBottom = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const FormSubmit = styled.button`
  width: 80px;
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
