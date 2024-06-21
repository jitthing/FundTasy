import styled from "styled-components";

import { AddedItem } from "./AddedItem";

export const AddedItems = ({ items }) => {
  return (
    <ItemsWrapper>
      {items.map((item, id) => {
        return <AddedItem key={id} item={item} />;
      })}
    </ItemsWrapper>
  );
};

const ItemsWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 10px; // Maintain space between items
  align-items: stretch; // Align items to stretch to fill the container height
  overflow-x: auto; // Allow horizontal scrolling
  width: 100%; // Full width of the parent
  height: auto; // Adjust height as needed
  padding: 10px; // Padding around the container
`;
