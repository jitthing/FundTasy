import React from "react";
import styled from "styled-components";

export default function FilterPigs({ closeForm, toggleUnownedFilter, toggleOwnedFilter, ownedFilter, unownedFilter}) {

    return (
    <FilterPigsBackdrop onClick={closeForm}>
      <FilterPigsModal onClick={(e) => e.stopPropagation()}>
        <FilterPigsHead>
            <CloseIcon srcSet="icons/close.png" onClick={closeForm} />
            <FilterPigsTitle>Filter Pigs</FilterPigsTitle>
        </FilterPigsHead>
        <FilterPigsBody>
            <FilterPigsBlock width="100%">
            <Label>
                <input type="checkbox" className="ownedCheckbox" defaultChecked={ownedFilter}
                onClick={toggleOwnedFilter}/>
                Owned
            </Label>
            <Label>
                <input type="checkbox" className="unownedCheckBox" defaultChecked={unownedFilter}
                onClick={toggleUnownedFilter}/>
                Unowned
            </Label>
            </FilterPigsBlock>
      </FilterPigsBody>
        </FilterPigsModal>
    </FilterPigsBackdrop>
    )
}
    


const FilterPigsBackdrop = styled.div`
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

const FilterPigsHead = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterPigsModal = styled.div`
  width: 30%;
  height: 45%;
  background-color: #fff;
  border-radius: 25px;
  padding: 10px;
`;

const CloseIcon = styled.img`
  height: 16px;
  width: 16px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
  }
`;

const FilterPigsTitle = styled.div`
  width: calc(100% - 20px);
  font-size: 16px;
  font-weight: bold;
`;

const FilterPigsBody = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0px;
`;

const FilterPigsBlock = styled.div`
  width: ${(props) => props.width};
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 10x;
`;

const Label = styled.label`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 25%;
  gap: 10px;
  font-size: 16px;
  text-align: left;
`