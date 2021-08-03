import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import "./MusicInventory.css";
import { useProfile } from "../../hooks/useProfile";
import db from "../../config/firebase";

function MusicInventory() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const profileData = useProfile();
  const [storeData, setStoreData] = useState(null);

  //-----------------------create snapshot listener for stores collection--------------------------------------
  //-----------------------eventually refactor into paginated infinite scroll---------------------------------

  useEffect(() => {
    if (profileData) {
      db.collection("stores")
        .doc(`${profileData.profileID}`)
        .onSnapshot(
          (docSnapshot) => {
            setStoreData(docSnapshot.data());
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }
  }, [profileData]);

  //-------------------------------------useEffect for sending search result to db-----------------------------------------

  useEffect(() => {
    if (searchResult) {
      let localArray = [];

      db.collection("stores").doc(`${profileData.profileID}`).add(searchResult);
      setSearchResult(null);
    }
  }, [searchResult]);

  //------------------------------return jsx------------------------------------------------------------------
  if (storeData) {
    return (
      <div>
        <h1>Manage your E-Store Music Inventory </h1>
        {storeData.albums.map((album) => {
          return <h1>{album.title}</h1>;
        })}
        <button
          onClick={() => {
            setIsSearching(true);
          }}
        >
          Search
        </button>
        {searchResult && <h1>{searchResult.strAlbum}</h1>}
        {isSearching && (
          <div className="searchBarComponent">
            <SearchBar
              setIsSearching={setIsSearching}
              setResult={setSearchResult}
            />
          </div>
        )}
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
}

export default MusicInventory;
