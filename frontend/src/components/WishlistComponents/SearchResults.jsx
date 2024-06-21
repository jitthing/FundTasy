import styled from "styled-components";
import { SearchResult } from "./SearchResult";

export const SearchResults = ({ results }) => {
  return (
    <SearchResultsWrapper>
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </SearchResultsWrapper>
  );
};

const SearchResultsWrapper = styled.div`
  width: 100%;
  background-color: white;
  font-color: black;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px #ddd;
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: scroll;
`;
