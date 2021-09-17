import React, { useState, useEffect } from "react";
import "./AlbumDisplayCard.css";
import firebase from "firebase";
import db from "../../config/firebase";

function AlbumDisplayCard({
  displayValue,
  displayTarget,
  setDisplayTarget,
  dbLocation,
  seller,
}) {
  const dispPriceTarget = displayValue.priceEssentials.priceTarget;
  const [updatePrice, setUpdatePrice] = useState(dispPriceTarget);
  const [isEditing, setIsEditing] = useState(false);
  let album = displayValue.dispEssentials;
  let gradeDictionary = { 1: "M", 2: "NM", 3: "VG+", 4: "VG", 5: "G" };

  useEffect(() => {
    setUpdatePrice(dispPriceTarget);
  }, [dispPriceTarget]);

  useEffect(() => {
    const sendUpdate = async () => {
      try {
        await db.collection("pendingInventoryUpdates").add({
          type: "edit",
          priceTarget: updatePrice,
          albumPage: displayValue.albumPage,
          seller: seller,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (isEditing) {
      console.log("this function is running");
      sendUpdate();
      setIsEditing(false);
    }
  }, [isEditing]);

  async function handleUpdate(_updatedAlbum) {
    dbLocation
      .update(_updatedAlbum)
      .then(() => {
        setDisplayTarget(0);
      })
      .catch(console.log("error"));
  }

  return (
    <div className="targetAlbum">
      <div className="targetAlbum__info">
        <img src={album.image} />
        <div className="targetAlbum__info__text">
          <h1>{album.albumTitle}</h1>
          <h1>{album.artist}</h1>
          <h1>{album.year}</h1>
        </div>
      </div>
      <div className="targetAlbum__condition">
        <h1>
          Sleeve:{" "}
          {gradeDictionary[displayValue.priceEssentials.sleeveCondition]}
        </h1>
        <h1>
          Media: {gradeDictionary[displayValue.priceEssentials.mediaCondition]}
        </h1>
      </div>

      <input
        className="targetPrice"
        type="number"
        placeholder={`$${dispPriceTarget}`}
        onChange={(e) => {
          setUpdatePrice(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Submit
      </button>

      <div
        className="delete"
        onClick={() =>
          handleUpdate({
            [`${displayTarget}`]: firebase.firestore.FieldValue.delete(),
          })
        }
      >
        <h3>Delete 🗑</h3>
      </div>
    </div>
  );
}

export default AlbumDisplayCard;
