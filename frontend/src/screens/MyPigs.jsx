import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPigs() {
  const [models, setModels] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.post("http://localhost:8000/all_models");
            const data = await response.data;
            // console.log(data);
            setModels(data);
          } catch (error) {
            console.error("Failed to fetch data", error);
          }
        }
        fetchData();
      }, []);

    return (
        <PageContainer>
            <Navbar page="mypigs" />
            <MyPigsContainer>
                <MyPigsHead>
                    <MyPigsTitle>My Pigs </MyPigsTitle>
                    <FilterButton>
                    <FilterIcon srcSet="icons/filter.png" />
                    <FilterText>Filter</FilterText>
                    </FilterButton>
                </MyPigsHead>
                <MyPigsBody>
                {models.map((model) => (
            <       PigCard pigname={model.toLowerCase()} pigTitle={model} isOwned={true} />
                ))}

                </MyPigsBody>
            </MyPigsContainer> 
        </PageContainer>
    )
}

function PigCard(props) {
    const isOwned = props.isOwned;
    const pigimg = `images/${props.pigname}.png`;
    if (isOwned) {
        return (
        <CardDiv>
            <PigImage srcSet={pigimg} />
            <CardInfo>
            <CardTitle>{props.pigTitle}</CardTitle>
            </CardInfo>
        </CardDiv>
        );
     } else {
        return (
            <CardDiv>
                <PigImage srcSet={pigimg} />
                <CardInfo>
                <UnownedTitle>Unowned</UnownedTitle>
                </CardInfo>
            </CardDiv>
            );
     }
  }

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const MyPigsTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  width: calc(80vw - 200px);
`;

const MyPigsContainer = styled.div`
  width: 80vw;
  font-family: Inter, sans-serif;
`;

const MyPigsHead = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
`;

const MyPigsBody = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  padding: 20px 40px;
  gap: 20px;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
`;


const FilterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 3px #adadad;
  padding: 0px 5px;
  margin: 0px 30px 0px auto;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
    transition: 0.1s;
  }
`;

const FilterIcon = styled.img`
  height: 14px;
  width: 14px;
`;

const FilterText = styled.div`
  font-size: 14px;
  width: 60%;
  text-align: right;
`;

const CardDiv = styled.div`
  width: calc((80vw - 140px) / 3);
  height: calc((100vh - 140px) / 2);
  min-width: 240px;
  min-height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  border: 1px solid #ececec;
  border-radius: 16px;
`;

const PigImage = styled.img`
  height: 80%;
  object-fit: cover;
  background-color: #ececec;
  border-radius: 10px;
`;

const CardInfo = styled.div`
  height: 20%;
  display: flex;
  font-size: 20px;
  align-items: center;
  vertical-align: middle;
`;

const UnownedTitle = styled.div`
  width: 60%;
  font-weight: bold;
  margin-right: auto;
  text-align: left;
  vertical-align: middle;
  padding: 0px 10px;
`;

const CardTitle = styled.div`
  width: 60%;
  font-weight: bold;
  margin-right: auto;
  text-align: left;
  vertical-align: middle;
  padding: 0px 10px;
`;

const CardPrice = styled.div`
  margin-left: 5px;
`;

const OwnedOption = styled.div`
  text-align: right;
  padding: 0px 10px;
  vertical-align: middle;
  color: green;
  font-weight: bold;
`;