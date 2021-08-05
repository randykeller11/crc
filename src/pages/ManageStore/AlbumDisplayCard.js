import React from "react";
import "./AlbumDisplayCard.css";

function AlbumDisplayCard({ displayValue }) {
  let album = displayValue.albumData;
  let hasRange = typeof displayValue.priceTarget === "object";

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
        <h1>
          {displayValue.condition === 1 && "⭐️"}
          {displayValue.condition === 2 && "⭐️⭐️"}
          {displayValue.condition === 3 && "⭐️⭐️⭐️"}
          {displayValue.condition === 4 && "⭐️⭐️⭐️⭐️"}
          {displayValue.condition === 5 && "⭐️⭐️⭐️⭐️⭐️"}
        </h1>
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
      <div className="delete">
        <h3>Delete 🗑</h3>
      </div>
    </div>
  );
}

export default AlbumDisplayCard;
