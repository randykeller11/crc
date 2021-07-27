import React, { useState, useEffect } from "react";
import { useFirestoreData } from "../hooks/useFirestoreData";
import db from "../config/firebase";
import AlbumSearch from "./AlbumSearch";

function Watchlist() {
  const userData = useFirestoreData("users");
  const [payload, setPayload] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  //write payload to db dynamically
  useEffect(() => {
    async function writeToDb(_collection, _payload, _id) {
      // Add a new document in collection "users" with ID of userID
      const res = await db.collection(_collection).doc(`${_id}`).set(_payload);
    }

    if (payload) {
      writeToDb("watchlists", payload, userData.id);
    }
  }, [payload]);

  return (
    <div>
      {userData && (
        <div className="watchlist">
          {isSearching && (
            <AlbumSearch
              _albumList={watchlist}
              _setAlbumList={setWatchlist}
              _setIsAddingAlbum={setIsSearching}
            />
          )}

          <button
            onClick={() => {
              setIsSearching(true);
              // setPayload({ emoji: "🍩", testPhrase: "donut" });
            }}
          >
            add Data
          </button>
        </div>
      )}
    </div>
  );
}
export default Watchlist;
