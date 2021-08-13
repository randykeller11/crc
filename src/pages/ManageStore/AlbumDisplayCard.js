import React from "react";
import "./AlbumDisplayCard.css";
import firebase from "firebase";

function AlbumDisplayCard({
  displayValue,
  displayTarget,
  setDisplayTarget,
  dbLocation,
}) {
  let album = displayValue.albumData;
  let hasRange = typeof displayValue.priceTarget === "object";

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
        <img src={album.strAlbumThumb} />
        <div className="targetAlbum__info__text">
          <h1>{album.strAlbum}</h1>
          <h1>{album.strArtist}</h1>
          <h1>{album.intYearReleased}</h1>
          {album.strLabel && <h1>{album.strLabel}</h1>}
        </div>
      </div>
      <div className="targetAlbum__condition">
        <h1>{displayValue.condition}</h1>
      </div>

      {hasRange ? (
        <div className="targetPrice">
          <input
            type="number"
            placeholder={`low: $${displayValue.priceTarget.low}`}
          />
          <input
            type="number"
            placeholder={`high: $${displayValue.priceTarget.high}`}
          />
        </div>
      ) : (
        <input
          className="targetPrice"
          type="number"
          placeholder={`$${displayValue.priceTarget}`}
        />
      )}
      <div className="generalInfo">
        <h3>Format: {displayValue.formatTags}</h3>
        <h3>UPC: {displayValue.albumUPC}</h3>
      </div>

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
