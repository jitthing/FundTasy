import axios from "axios";
import styled from "styled-components";

export const SearchResult = ({ result, updateWishlist, username }) => {
  const handleClick = async (result) => {
    try {
      const body = { ...result, username: username };
      const response = await axios.post(
        "http://localhost:8000/add_wishlist_item",
        body
      );
      // console.log(body);
      updateWishlist();
      alert(`${response.data.message}`);
    } catch (error) {
      alert("Item already in wishlist!");
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
