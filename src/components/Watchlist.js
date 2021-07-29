import React, { useState, useEffect, useContext, useReducer } from "react";
import WatchlistDisplay from "./WatchlistDisplay";
import { getData } from "./helperFunctions";
import AlbumSearch from "./AlbumSearch";
import { useFirestoreData } from "../hooks/useFirestoreData";
import { initialState, watchlistReducer } from "../reducers/watchlistReducer";

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
        {watchlist && watchlist.topFive && (
          <WatchlistDisplay _initValue={watchlist.topFive} _isTopFive={true} />
        )}
        {watchlist && watchlist.secondTier && (
          <WatchlistDisplay
            _initValue={watchlist.secondTier}
            _isTopFive={false}
          />
        )}
      </div>
    </watchlistContext.Provider>
  );
}

export default Watchlist;
