import React from "react";
import styled from "styled-components";

export default function SkinSection({ getModelName, getImagePath, mypigs, selectModel, show, toggle }) {
  if (show) {
    return (
        <SkinContainer>
          <SkinInfo>
            <div>{getModelName()}</div>
            <div style={{ fontSize:"14px" }}>
              Earned on:
              <div style={{ fontWeight:"normal", textAlign:"right" }}>27/5/23</div>
            </div>
          </SkinInfo>
          <SkinButtons>
            {Object.keys(mypigs).map((modelname) => (
              <SkinImg srcSet={getImagePath(modelname)} onClick={() => selectModel(modelname)}/>
            ))}
          </SkinButtons>
          <SkinEnd>
            <CancelSkin onClick={toggle}>Cancel</CancelSkin>
            <SaveSkin>Save</SaveSkin>
          </SkinEnd>
        </SkinContainer>
    )
  } else {
    return (
      <EditButton onClick={toggle}>
        Change
        <EditIcon srcSet="icons/edit.png"/>
      </EditButton>
    )
  }
}

const SkinContainer = styled.div`
  height: 48vh;
  min-width: 300px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px #cecece;
  overflow: hidden;
`

const SkinInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
  font-size: 20px;
  font-weight: bold;
`

const SkinButtons = styled.div`
  width: 300px;
  height: calc(48vh - 115px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 5px;
  overflow: scroll;
  overflow-x: hidden;
  padding: 5px;
`;

const SkinImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  background-color: #ececec;
  cursor:pointer;
  border-radius: 8px;
  &:hover {
    filter: brightness(1.05);
    transition: 0.1s;
  }
`

const SkinEnd = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  height: 50px;
  padding: 10px 5px;
`

const SaveSkin = styled.div`
  width: 25%;
  height: 22px;
  border-radius: 15px;
  font-size: 14px;
  font-weight:bold;
  background-color: #645df2;
  color: #fff;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
    transition: 0.1s;
  }
`

const CancelSkin = styled.div`
  width: 25%;
  height: 22px;
  vertical-align: middle;
  border-radius: 15px;
  font-size: 14px;
  font-weight:bold;
  background-color: grey;
  color: #fff;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
    transition: 0.1s;
  }
`

const EditButton = styled.div`
  min-width: 90px;
  height: 30px;
  cursor: pointer;
  box-shadow: 0px 0px 10px #cecece;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0px 10px;
  font-size: 12px;
  font-weight: bold;
  &:hover {
    background-color: #645df2;
    color: #fff;
  }
  margin:0px 20px auto 0px;
`

const EditIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: brightness(0);
  ${EditButton}:hover & {
    filter: brightness(1);
  }
`