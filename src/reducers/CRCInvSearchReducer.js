import React from "react";

export const initialState = {
  searchType: 0,
  query: null,
  albumResults: null,
  artistResults: [],
  artistURL: null,
};

export const CRCInvSearchReducer = (state, action) => {
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
