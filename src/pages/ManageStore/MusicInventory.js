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
              {storeData.albums.map((album) => {
                let info = album.albumData;
                let hasRange = typeof album.priceTarget === "object";
                return (
                  <div className="mainDisplay__inventory__card">
                    <img src={info.strAlbumThumb} alt="" />
                    <div className="inventory__card__info">
                      <div className="inventory__card__top">
                        <h4>{info.strAlbum}</h4>
                        <h5>{info.strArtist}</h5>
                        <h5>{info.intYearReleased}</h5>
                      </div>
                      <div className="inventory__card__bottom">
                        <h5>
                          {album.condition === 1 && "⭐️"}
                          {album.condition === 2 && "⭐️⭐️"}
                          {album.condition === 3 && "⭐️⭐️⭐️"}
                          {album.condition === 4 && "⭐️⭐️⭐️⭐️"}
                          {album.condition === 5 && "⭐️⭐️⭐️⭐️⭐️"}
                        </h5>
                        <h5 style={{ "margin-top": ".65vh" }}>
                          {hasRange
                            ? `$${album.priceTarget.low}-$${album.priceTarget.high}`
                            : `$${album.priceTarget}`}
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
