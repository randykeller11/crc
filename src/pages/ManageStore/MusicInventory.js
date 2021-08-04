import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import SearchBar from "../../components/SearchBar";
import "./MusicInventory.css";
import { useProfile } from "../../hooks/useProfile";
import db from "../../config/firebase";
import "../../components/AddAlbumToStore";
import AddAlbumToStore from "../../components/AddAlbumToStore";
import InventoryDisplayCard from "./InventoryDisplayCard";
import AlbumDisplayCard from "./AlbumDisplayCard";

function MusicInventory() {
  const [isAdded, setIsAdded] = useState(false);
  const [newAlbumObject, setNewAlbumObject] = useState(null);
  const profileData = useProfile();
  const [storeData, setStoreData] = useState(null);
  const [addAlbumMode, setAddAlbumMode] = useState(false);
  const [displayTarget, setDisplayTarget] = useState(null);
  const [displayValue, setDisplayValue] = useState(null);

  //-----------------------create snapshot listener for stores collection--------------------------------------
  //-----------------------eventually refactor into paginated infinite scroll---------------------------------

  useEffect(() => {
    if (profileData) {
      db.collection("musicInventories")
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
    return;
  }, [profileData]);

  useEffect(() => {
    if (newAlbumObject) {
      db.collection("musicInventories")
        .doc(`${profileData.profileID}`)
        .set({ [`${uuid()}`]: newAlbumObject }, { merge: true })
        .then(() => {
          setIsAdded(true);
        })
        .catch(console.log("error"));
    }
  }, [newAlbumObject]);

  useEffect(() => {
    displayTarget && setDisplayValue(storeData[displayTarget]);
  }, [displayTarget]);

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
              <AlbumDisplayCard displayValue={displayValue} />
            </div>
            <div className="mainDisplay__inventory">
              {storeData &&
                Object.keys(storeData).map(function (key, index) {
                  return (
                    <InventoryDisplayCard
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
