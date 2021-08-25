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
        <img src={album.images[0].resource_url} />
        <div className="targetAlbum__info__text">
          <h1>{album.title}</h1>
          <h1>{album.artists_sort}</h1>
          <h1>{album.year}</h1>
        </div>
      </div>
      <div className="targetAlbum__condition">
        <h1>Sleeve: {displayValue.sleeveCondition}</h1>
        <h1>Media: {displayValue.mediaCondition}</h1>
      </div>

      <input
        className="targetPrice"
        type="number"
        placeholder={`$${displayValue.priceTarget}`}
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
