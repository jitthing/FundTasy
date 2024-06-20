import * as React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";

import { SearchBar } from "../components/WishlistComponents/SearchBar";
import { SearchResults } from "../components/WishlistComponents/SearchResults";

export default function Wishlist() {
  const [results, setResults] = useState([]);

  return (
    <PageContainer>
      <Navbar page="wishlist" />
      <SearchWrapper>
        <SearchBar setResults={setResults} />
        <SearchResults results={results} />
      </SearchWrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: start;
  margin: 0px;
  padding: 0px;
`;

const SearchWrapper = styled.div`
  padding-top: 7vh;
  padding-left: 7vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;
