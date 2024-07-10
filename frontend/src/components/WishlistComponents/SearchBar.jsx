import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

export const SearchBar = ({ setResults, setDisplayResults }) => {
  const [input, setInput] = useState("");

  const fetchAmazonData = async (value) => {
    if (value !== "") {
      const search = value.split(" ").join("+");
      const response = await axios.post("http://localhost:8000/scrape_amazon", {
        url: `https://www.amazon.sg/s?k=${search}`,
      });
      const data = await response.data;
      console.log(data);
      setResults(data);
      setDisplayResults(true);
    } else {
      setResults([]);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      fetchAmazonData(event.target.value);
    }
  };
  const handleChange = (value) => {
    setInput(value);
  };
  return (
    <SearchBarWrapper>
      <FaSearch />
      <SearchBarInput
        placeholder="Search on amazon.sg"
        value={input}
        onKeyDown={handleEnter}
        onChange={(e) => handleChange(e.target.value)}
      />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 10px;
  height: 2.5rem;
  padding: 0 15px;
  box-shadow: 0px 0px 8px #ddd;
  display: flex;
  align-items: center;
`;

const SearchBarInput = styled.input`
    background-colour: transparent;
    border: none;
    height: 10px:
    font-size: 1.25rem;
    width: 100%;
    margin-left: 10px;

    &:focus{
        outline: none;
    }
`;
