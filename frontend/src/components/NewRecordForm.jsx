import React, { useState } from "react";
import styled from "styled-components";

export default function NewRecordForm({ closeForm }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("others");
    const [amount, setAmount] = useState("0.00");
    
    return (
        <NewRecordBackdrop onClick={closeForm}>
            <NewRecordModal onClick={(e) => e.stopPropagation()}>
                <NewRecordHead>
                    <CloseIcon srcSet="icons/close.png" onClick={closeForm}/>
                    <NewRecordTitle>New Record</NewRecordTitle>
                </NewRecordHead>
                <NewRecordBody>
                    <FormBlock width="100%">
                        <FormLabel>Title</FormLabel>
                        <FormTextInput required placeholder="Title" />
                    </FormBlock>
                    <FormBlock width="50%">
                        <FormLabel>Category</FormLabel>
                        <FormDropdown>
                            <FormOption disabled selected>Select Category</FormOption>
                            <FormOption>Food</FormOption>
                            <FormOption>Lifestyle</FormOption>
                            <FormOption>School</FormOption>
                            <FormOption>Subscriptions</FormOption>
                            <FormOption>Others</FormOption>
                        </FormDropdown>
                    </FormBlock>
                    <FormBlock width="50%">
                        <FormLabel>Goal to Deduct</FormLabel>
                        <FormDropdown>
                        <FormOption disabled selected>Select Goal</FormOption>
                            <FormOption>Food</FormOption>
                            <FormOption>Lifestyle</FormOption>
                            <FormOption>School</FormOption>
                            <FormOption>Subscriptions</FormOption>
                            <FormOption>Others</FormOption>
                        </FormDropdown>
                    </FormBlock>
                    <FormBlock width="100%">
                        <FormLabel>Amount</FormLabel>
                        <FormTextInput type="number" required name="price" min="0" value="0" step="0.01" placeholder="Amount" />
                    </FormBlock>
                </NewRecordBody>
                <FormBottom>
                    <FormSubmit>Submit</FormSubmit>
                </FormBottom>
            </NewRecordModal>
        </NewRecordBackdrop>
    )
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
`

const NewRecordModal = styled.div`
    width: 60%;
    height: 90%;
    background-color: #fff;
    border-radius: 30px;
    padding: 30px;
`

const CloseIcon = styled.img`
    height: 16px;
    width: 16px;
    cursor: pointer;
    &:hover {
        filter: brightness(0.85);
    }
`

const NewRecordHead = styled.div`
    height: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NewRecordTitle = styled.div`
    width: calc(100% - 20px);
    font-size: 20px;
    font-weight: bold;
`

const NewRecordBody = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 0px;
`

const FormBlock = styled.div`
    width: ${(props) => props.width};
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10x;
`

const FormLabel = styled.div`
    text-align: left;
    font-weight: bold;
    font-size: 16px;
`

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
`

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
`

const FormOption = styled.option`
    height: 30px;
    width: 100%;
    font-size: 16px;
    color: black;
`

const FormBottom = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 50px;
`

const FormSubmit = styled.div`
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
`