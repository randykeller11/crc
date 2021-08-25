import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import {
  initialState,
  DiscogsSearchReducer,
} from "../reducers/DiscogsSearchReducer";
import { getSearchData } from "./helperFunctions";

function DiscogsSearch() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchState, dispatch] = useReducer(
    DiscogsSearchReducer,
    initialState
  );

  useEffect(() => {
    isSubmitted &&
      getSearchData(
        `https://api.discogs.com/database/search?catno=${searchState.query}`,
        dispatch,
        "albumResults"
      );
  }, [isSubmitted]);

  return (
    <div>
      <input
        type="text"
        value={searchState.query}
        onChange={(e) => {
          dispatch({
            type: "update",
            payload: { location: "query", updateValue: e.target.value },
          });
        }}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            setIsSubmitted(true);
          }
        }}
      />
    </div>
  );
}

export default DiscogsSearch;
