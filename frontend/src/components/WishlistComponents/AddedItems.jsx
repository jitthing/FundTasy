import styled from "styled-components";

export const AddedItems = ({ items }) => {
  return (
    <ItemsWrapper>
      {items.map((item, id) => {
        return <div key={id}>{item.name}</div>;
      })}
    </ItemsWrapper>
  );
};

const ItemsWrapper = styled.div`
  padding-top: 4vh;
  display: flex;
  flex-direction: row;
`;
