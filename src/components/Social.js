import * as React from "react";
import styled from "styled-components";

export default function Social() {
    return (
        <Div>
            <SearchBar placeholder="Find a friend" />
        </Div>
    )
}

const Div = styled.div`
    display: flex;
    align-content: flex-end;
    max-width: 320px;
    width: 25vw;
    height: 100vh;
    flex-direction: column;
    font-size: 24px;
    color: #7b7b7b;
    font-weight: 600;
    font-family: Inter, sans-serif;
    margin: 0px;
    padding: 0px 30px;
    border-left:1px solid #d9d9d9;
    margin-left: auto;
`

const SearchBar = styled.input`
    width: 100%;
    height: 30px;
    border: 1px solid #bdbdbd;
    border-radius: 15px;
    font-size: 16px;
    padding: 0px 15px;
    margin-top: 20px;
`

