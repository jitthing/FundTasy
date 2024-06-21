import styled from "styled-components";

export const AddedItem = ({ item }) => {
  return (
    <CardDiv>
      <TempWrap>
        <WishlistImage src={item.image} />
        <PriceWrap>{item.price}</PriceWrap>
      </TempWrap>
      <div>{item.name}</div>
    </CardDiv>
  );
};

const TempWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const PriceWrap = styled.div`
  padding-left: 50px;
  padding-top: 50px;
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
  background-color: #ececec;
`;

const WishlistImage = styled.img`
  padding-left: 20px;
  width: 129px;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
`;
