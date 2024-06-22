import styled from "styled-components";

export const AddedItem = ({ item }) => {
  return (
    <CardDiv>
      <WishlistImage src={item.image} />
      <DesctiptionWrap>
        <div className="font-extrabold text-xl">${item.price}</div>
        <div>
          {item.name.length > 50 ? `${item.name.slice(0, 60)}...` : item.name}
        </div>
      </DesctiptionWrap>
    </CardDiv>
  );
};

const DesctiptionWrap = styled.div`
  display: flex;
  flex-direction: column;
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

const WishlistImage = styled.img`
  max-width: 100%;
  max-height: 75%;
  margin: auto;
  object-fit: contain;
  border-radius: 10px;
`;
