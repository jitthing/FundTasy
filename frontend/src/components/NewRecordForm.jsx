import React, { useState } from "react";
import styled from "styled-components";

export default function NewRecordForm({ closeForm }) {
    const [title, setTitle] = useState("");
    
    return (
        <NewRecordBackdrop>
            <NewRecordModal>
                <NewRecordHead>
                    <CloseIcon srcSet="icons/close.png" onClick={closeForm}/>
                    <NewRecordTitle>New Record</NewRecordTitle>
                </NewRecordHead>
            </NewRecordModal>
        </NewRecordBackdrop>
    )
}

const NewRecordBackdrop = styled.div`
    z-index: 100;
    width: 80vw;
    min-height: 100vh;
    max-height: 100%;
    background-color: #00000080;
    overflow-y: scroll;
`

const NewRecordModal = styled.div`
    width: 85%;
    height: 90%;
    background-color: #fff;
    border-radius: 30px;
    padding: 30px;
    margin: 30px auto;
`

const CloseIcon = styled.img`
    height: 20px;
    width: 20px;
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