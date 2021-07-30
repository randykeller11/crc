import React, { useState, useEffect, useReducer } from "react";
import "./SearchBar.css";
import { initialState, SearchBarReducer } from "../reducers/SearchBarReducer";

function SearchBar({ setIsSearching, setResult }) {
  const [searchState, dispatch] = useReducer(SearchBarReducer, initialState);
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={
          searchState.searchType === 0 ? "ATLiens" : "Lonnie Liston Smith"
        }
      />
      <div className="searchBar__options">
        <div
          className={
            searchState.searchType === 0
              ? "searchBar__options__selectorActive"
              : "searchBar__options__selector"
          }
        >
          <h3>Album</h3>
        </div>
        <div
          className={
            searchState.searchType === 1
              ? "searchBar__options__selectorActive"
              : "searchBar__options__selector"
          }
        >
          <h3>Artist</h3>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
