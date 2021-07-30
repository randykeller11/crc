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
    case "update":
      return {
        ...state,
        [action.payload.location]: action.payload.updateValue,
      };
    default:
      throw new Error();
  }
};
