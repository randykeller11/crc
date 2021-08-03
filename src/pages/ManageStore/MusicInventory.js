import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import "./MusicInventory.css";
import { useProfile } from "../../hooks/useProfile";
import db from "../../config/firebase";
import "../../components/AddAlbumToStore";
import AddAlbumToStore from "../../components/AddAlbumToStore";

function MusicInventory() {
  const [isAdded, setIsAdded] = useState(false);
  const [newAlbumObject, setNewAlbumObject] = useState(null);
  const profileData = useProfile();
  const [storeData, setStoreData] = useState(null);
  const [addAlbumMode, setAddAlbumMode] = useState(false);

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

  useEffect(() => {
    if (newAlbumObject) {
      let localArray = [...storeData.albums];
      localArray.push(newAlbumObject);
      db.collection("stores")
        .doc(`${profileData.profileID}`)
        .set({ ...storeData, albums: localArray })
        .then(setIsAdded(true))
        .catch(console.log("error"));
    }
  }, [newAlbumObject]);

  //------------------------------return jsx------------------------------------------------------------------
  if (storeData) {
    return (
      <div>
        {!addAlbumMode &&
          storeData.albums.map((album) => {
            return <h1>{album.albumData.strAlbum}</h1>;
          })}
        {!addAlbumMode && (
          <button
            onClick={() => {
              setAddAlbumMode(true);
            }}
          >
            add
          </button>
        )}
        {addAlbumMode && (
          <AddAlbumToStore
            profileID={profileData.profileID}
            setAddAlbumMode={setAddAlbumMode}
            setNewAlbumObject={setNewAlbumObject}
          />
        )}
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
}

export default MusicInventory;
