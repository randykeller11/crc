import React from "react";
import { getData } from "../components/helperFunctions";

export const initialState = {
  searchType: 0,
  query: null,
  albumResults: null,
  artistResults: [],
  artistURL: null,
};

export const SearchBarReducer = (state, action) => {
  switch (action.type) {
    case "albumSearch":
      return {
        ...state,
        albumResults: action.payload,
      };
    case "artistSearch":
      return {
        ...state,
        artistResults: action.payload,
      };
    case "setSearchType":
      return { ...state, searchType: action.payload };
    case "setQuery":
      return { ...state, query: action.payload };
    default:
      throw new Error();
  }
};
