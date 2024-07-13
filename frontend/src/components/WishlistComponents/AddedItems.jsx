import styled from "styled-components";

import { AddedItem } from "./AddedItem";

export const AddedItems = ({ items, updateWishlist }) => {
  return (
    <ItemsWrapper>
      {items.map((item, id) => {
        return (
          <AddedItem key={id} item={item} updateWishlist={updateWishlist} />
        );
      })}
    </ItemsWrapper>
  );
};

const ItemsWrapper = styled.div`
  display: flex;
  z-index: 0;
  flex-wrap: wrap;
  gap: 10px; // Maintain space between items
  align-items: stretch; // Align items to stretch to fill the container height
  overflow-x: auto; // Allow horizontal scrolling
  width: 100%; // Full width of the parent
  height: auto; // Adjust height as needed
  padding: 20px 50px; // Padding around the container
  justify-content: start;
  margin-top: 20px;
`;
