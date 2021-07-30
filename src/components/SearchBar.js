import React, { useState, useEffect, useReducer } from "react";
import "./SearchBar.css";
import { initialState, SearchBarReducer } from "../reducers/SearchBarReducer";

function SearchBar({ setIsSearching, setResult }) {
  const [searchState, dispatch] = useReducer(SearchBarReducer, initialState);

  const handleSubmit = () => {
    console.log("time to submit something");
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={
          searchState.searchType === 0 ? "ATLiens" : "Lonnie Liston Smith"
        }
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            handleSubmit();
          }
        }}
        onChange={(e) => {
          dispatch({ type: "setQuery", payload: e.target.value });
          if (searchState.query && searchState.query.length >= 7) {
            handleSubmit();
          }
        }}
      />
      <div className="searchBar__options">
        <div
          className={
            searchState.searchType === 0
              ? "searchBar__options__selectorActive"
              : "searchBar__options__selector"
          }
          onClick={() => {
            dispatch({ type: "setSearchType", payload: 0 });
          }}
        >
          <h3>Album</h3>
        </div>
        <div
          className={
            searchState.searchType === 1
              ? "searchBar__options__selectorActive"
              : "searchBar__options__selector"
          }
          onClick={() => {
            dispatch({ type: "setSearchType", payload: 1 });
          }}
        >
          <h3>Artist</h3>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
