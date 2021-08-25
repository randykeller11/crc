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
      <img src={info.thumb} alt="" />
      <div className="inventory__card__info">
        <div className="inventory__card__top">
          <h4>{info.title}</h4>
          <h5>{info.artists_sort}</h5>
          <h5>{info.released}</h5>
        </div>
        <div className="inventory__card__bottom">
          <h5>Sleeve: {album.sleeveCondition}</h5>
          <h5>Media: {album.mediaCondition}</h5>
          <h5>${album.priceTarget}</h5>
        </div>
      </div>
    </div>
  );
}

export default InventoryDisplayCard;
