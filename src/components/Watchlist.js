import React, { useState, useEffect, useReducer } from "react";
import WatchlistDisplay from "./WatchlistDisplay";
import { getData } from "./helperFunctions";
import AlbumSearch from "./AlbumSearch";
import { useFirestoreData } from "../hooks/useFirestoreData";
import { initialState, watchlistReducer } from "../reducers/watchlistReducer";
import "./Watchlist.css";
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

  const [editMode, setEditMode] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null);

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, handleInit);
    }
  }, [userData]);

  return (
    <watchlistContext.Provider
      value={{
        editMode,
        watchlist,
        watchlistDispatch,
        setIsSearching,
        setSearchTarget,
      }}
    >
      {isSearching ? (
        <h1>time to search</h1>
      ) : (
        <div className="watchlist">
          <div className="watchlist__header">
            <h1>My Collection</h1>
            <button>edit</button>
          </div>
          {watchlist && watchlist.topFive && (
            <WatchlistDisplay
              _initValue={watchlist.topFive}
              _isTopFive={true}
            />
          )}
          {watchlist && watchlist.secondTier && (
            <WatchlistDisplay
              _initValue={watchlist.secondTier}
              _isTopFive={false}
            />
          )}
        </div>
      )}
    </watchlistContext.Provider>
  );
}

export default Watchlist;
