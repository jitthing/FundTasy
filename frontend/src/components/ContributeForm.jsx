import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getUser from "../utils/getUser";
import axios from "axios";

export default function ContributeForm({ closeContributeForm }) {
    return (
        <ContributeBackdrop onClick={closeContributeForm}>
            <ContributeModal onClick={(e) => e.stopPropagation()}></ContributeModal>
        </ContributeBackdrop>
    )
}

const ContributeBackdrop = styled.div`
  z-index: 100;
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

const ContributeModal = styled.div`
  width: 60%;
  height: 90%;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;