import React, { useState, useEffect } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";
import { getData, writeToDb } from "./helperFunctions";
import "./Watchlist.css";
import WatchlistAlbum from "./WatchlistAlbum";

function Watchlist() {
  const userData = useFirestoreData("users");
  const [payload, setPayload] = useState(null);
  const [dbWatchlist, setDbWatchlist] = useState(null);
  const [localWatchlist, setLocalWatchlist] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (userData) {
      getData("watchlists", userData.id, setDbWatchlist);
    }
  }, [userData]);

  //write payload to db dynamically
  useEffect(() => {
    if (payload) {
      writeToDb("watchlists", payload, userData.id);
      setPayload(null);
    }
  }, [payload]);

  useEffect(() => {
    if (dbWatchlist) {
      console.log(dbWatchlist.watchlist);
      let localArray = [];
      for (let i = 0; i < 20; i++) {
        if (i < dbWatchlist.watchlist.length) {
          localArray.push(dbWatchlist.watchlist[i]);
        } else {
          localArray.push(0);
        }
      }
      setLocalWatchlist(localArray);
    }
  }, [dbWatchlist]);

  const testButton = (
    <button
      onClick={() => {
        setIsSearching(true);
        setPayload({ emoji: "🍩", testPhrase: "donut" });
      }}
    >
      edit
    </button>
  );

  //------------------primary watchlist component------------------
  if (userData) {
    return (
      <div className="watchlist">
        {!isSearching && (
          <div className="watchlist__console">
            {localWatchlist &&
              localWatchlist.map((album, i) => {
                return (
                  <WatchlistAlbum _album={album} key={album.index} _index={i} />
                );
              })}
          </div>
        )}

        {isSearching && (
          <div className="watchlist__search">
            <AlbumSearch
              _albumList={dbWatchlist}
              _setAlbumList={setDbWatchlist}
              _setIsAddingAlbum={setIsSearching}
            />
          </div>
        )}
      </div>
    );
  }
  //-----------loading page until user data is loaded-------------
  return <h1>loading watchlist...</h1>;
}
export default Watchlist;
