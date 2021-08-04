import React from "react";
import "./InventoryDisplayCard.css";

function InventoryDisplayCard({
  album,
  cardID,
  displayTarget,
  setDisplayTarget,
}) {
  let info = album.albumData;
  let hasRange = typeof album.priceTarget === "object";
  let isTarget = displayTarget === cardID;

  return (
    <div
      className={
        isTarget ? "inventory__card__active" : "mainDisplay__inventory__card"
      }
      onClick={() => {
        setDisplayTarget(cardID);
      }}
    >
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
}

export default InventoryDisplayCard;
