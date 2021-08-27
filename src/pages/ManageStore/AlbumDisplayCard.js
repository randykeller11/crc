import React from "react";
import "./AlbumDisplayCard.css";
import firebase from "firebase";

function AlbumDisplayCard({
  displayValue,
  displayTarget,
  setDisplayTarget,
  dbLocation,
}) {
  let album = displayValue.dispEssentials;
  let gradeDictionary = { 5: "M", 4: "NM", 3: "VG+", 2: "VG", 1: "G" };

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
        placeholder={`$${displayValue.priceEssentials.priceTarget}`}
      />

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
