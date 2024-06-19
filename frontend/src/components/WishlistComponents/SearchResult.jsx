import styled from "styled-components";

export const SearchResult = ({ result }) => {
  return (
    <SearchResultWrapper
      onClick={(e) => alert(`You clicked on ${result.title}`)}
    >
      <img src={result.image} width="40" height="20" />
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
  }
`;
