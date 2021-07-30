import React from "react";
import { getData } from "../components/helperFunctions";

export const initialState = {
  searchType: null,
  query: null,
  albumResults: null,
  artistResults: [],
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
    default:
      throw new Error();
  }
};
