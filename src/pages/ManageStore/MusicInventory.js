import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import SearchBar from "../../components/SearchBar";
import "./MusicInventory.css";
import { useProfile } from "../../hooks/useProfile";
import db from "../../config/firebase";
import "../../components/AddAlbumToStore";
import AddAlbumToStore from "../../components/AddAlbumToStore";
import AlbumDisplayCard from "./AlbumDisplayCard";

function MusicInventory() {
  const [isAdded, setIsAdded] = useState(false);
  const [newAlbumObject, setNewAlbumObject] = useState(null);
  const profileData = useProfile();
  const [storeData, setStoreData] = useState(null);
  const [addAlbumMode, setAddAlbumMode] = useState(false);
  const [displayTarget, setDisplayTarget] = useState(null);

  //-----------------------create snapshot listener for stores collection--------------------------------------
  //-----------------------eventually refactor into paginated infinite scroll---------------------------------

  useEffect(() => {
    if (profileData) {
      db.collection("storeMusicInventorys")
        .doc(`${profileData.profileID}`)
        .onSnapshot(
          (docSnapshot) => {
            setStoreData(docSnapshot.data());
          },
          (err) => {
            console.log("error");
          }
        );
    }
  }, [profileData]);

  useEffect(() => {
    if (newAlbumObject) {
      db.collection("storeMusicInventorys")
        .doc(`${profileData.profileID}`)
        .set({ [`${uuid()}`]: newAlbumObject }, { merge: true })
        .then(() => {
          setIsAdded(true);
        })
        .catch(console.log("error"));
    }
  }, [newAlbumObject]);

  useEffect(() => {
    storeData && console.log(storeData);
  }, [storeData]);

  //------------------------------return jsx------------------------------------------------------------------

  if (storeData) {
    return (
      <div>
        {!addAlbumMode && (
          <button
            onClick={() => {
              setAddAlbumMode(true);
            }}
          >
            add
          </button>
        )}
        {!addAlbumMode && (
          <div className="mainDisplay">
            <div className="mainDisplay__album">
              <h1>album display</h1>
            </div>
            <div className="mainDisplay__inventory">
              {storeData &&
                Object.keys(storeData).map(function (key, index) {
                  return (
                    <AlbumDisplayCard
                      album={storeData[key]}
                      cardID={key}
                      displayTarget={displayTarget}
                      setDisplayTarget={setDisplayTarget}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {addAlbumMode && (
          <AddAlbumToStore
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
