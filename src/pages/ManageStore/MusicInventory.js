import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import SearchBar from "../../components/SearchBar";
import "./MusicInventory.css";
import { useAuth } from "../../auth-context";
import db from "../../config/firebase";
import "../../components/AddAlbumToStore";
import AddAlbumToStore from "../../components/AddAlbumToStore";
import InventoryDisplayCard from "./InventoryDisplayCard";
import AlbumDisplayCard from "./AlbumDisplayCard";

function MusicInventory() {
  const [isAdded, setIsAdded] = useState(false);
  const [newAlbumObject, setNewAlbumObject] = useState(null);
  const { currentUser } = useAuth();
  const [storeData, setStoreData] = useState(null);
  const [addAlbumMode, setAddAlbumMode] = useState(false);
  const [displayTarget, setDisplayTarget] = useState(null);
  const [displayValue, setDisplayValue] = useState(null);
  const [docRef, setDocRef] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  //-----------------------create snapshot listener for stores collection--------------------------------------
  //-----------------------eventually refactor into paginated infinite scroll---------------------------------

  useEffect(() => {
    currentUser &&
      db
        .collection("musicInventories")
        .doc(`${currentUser.uid}`)
        .onSnapshot(
          (docSnapshot) => {
            setStoreData(docSnapshot.data());
          },
          (err) => {
            console.log("error");
          }
        );

    return;
  }, [currentUser]);

  useEffect(() => {
    newAlbumObject &&
      db
        .collection("pendingInventoryUpdates")
        .add({
          type: "add",
          seller: `${currentUser.uid}`,
          inventoryID: `${uuid()}`,
          value: newAlbumObject,
        })
        .then(() => {
          setNewAlbumObject(null);
          setIsAdded(true);
        })
        .catch(console.log("error"));
  }, [newAlbumObject]);

  useEffect(() => {
    if (storeData) {
      setDocRef(db.collection("musicInventories").doc(`${currentUser.uid}`));
      let keysArray = Object.keys(storeData);
      setDisplayTarget(keysArray[0]);
    }
  }, [storeData]);

  useEffect(() => {
    if (displayTarget && displayTarget != 0) {
      setDisplayValue(storeData[displayTarget]);
    } else if (displayTarget === 0) {
      let keysArray = Object.keys(storeData);
      setDisplayTarget(keysArray[0]);
    }
  }, [displayTarget]);

  //------------------------------return jsx------------------------------------------------------------------

  if (storeData) {
    return (
      <div>
        {!addAlbumMode && (
          <div className="component__header">
            <button
              onClick={() => {
                setAddAlbumMode(true);
              }}
            >
              add
            </button>
            <h1>Music Inventory</h1>
            <input type="text" placeholder="Search Inventory" />
          </div>
        )}
        {!addAlbumMode && (
          <div className="mainDisplay">
            <div className="mainDisplay__album">
              {displayValue && (
                <AlbumDisplayCard
                  displayValue={displayValue}
                  displayTarget={displayTarget}
                  setDisplayTarget={setDisplayTarget}
                  dbLocation={docRef}
                  seller={`${currentUser.uid}`}
                />
              )}
            </div>
            <div className="mainDisplay__inventory">
              {storeData &&
                Object.keys(storeData).map(function (key) {
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
