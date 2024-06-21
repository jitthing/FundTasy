import axios from "axios";
import styled from "styled-components";

export const SearchResult = ({ result, updateWishlist }) => {
  const handleClick = async (result) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/add_wishlist_item",
        result
      );
      updateWishlist();
      alert("Item added to wishlist!");
    } catch (error) {
      if (error.response) {
        console.error(error.response.body);
      }
    }
  };
  return (
    <SearchResultWrapper onClick={() => handleClick(result)}>
      <img alt="" src={result.image} width="40" height="20" />
      {result.title}
    </SearchResultWrapper>
  );
};

const SearchResultWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  &:hover {
    background-color: #efefef;
    cursor: pointer;
  }
`;
