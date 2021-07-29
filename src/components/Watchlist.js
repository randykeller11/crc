import React, { useState, useEffect, useContext, useReducer } from "react";
import WatchlistDisplay from "./WatchlistDisplay";
import { getData } from "./helperFunctions";
import AlbumSearch from "./AlbumSearch";
import { useFirestoreData } from "../hooks/useFirestoreData";

const initialState = {
  topFive: null,
  secondTier: null,
};

const watchlistReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "update":
      return {
        ...state,
        [action.payload.tier]: action.payload.updateValue,
      };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};

export const watchlistContext = React.createContext();

function Watchlist() {
  const [watchlist, watchlistDispatch] = useReducer(
    watchlistReducer,
    initialState
  );

  const userData = useFirestoreData("users");

  const handleInit = (_initValue) => {
    watchlistDispatch({ type: "init", payload: _initValue });
  };

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, handleInit);
    }
  }, [userData]);

  return (
    <watchlistContext.Provider>
      <div className="watchlist">
        <h1>watchlist connected 🍩</h1>
      </div>
    </watchlistContext.Provider>
  );
}

export default Watchlist;
