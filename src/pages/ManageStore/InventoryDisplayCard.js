import React from "react";
import "./InventoryDisplayCard.css";

function InventoryDisplayCard({
  album,
  cardID,
  displayTarget,
  setDisplayTarget,
}) {
  let disp = album.dispEssentials;
  let hasRange = typeof album.priceTarget === "object";
  let isTarget = displayTarget === cardID;
  let gradeDictionary = { 5: "M", 4: "NM", 3: "VG+", 2: "VG", 1: "G" };

  return (
    <div
      className={
        isTarget ? "inventory__card__active" : "mainDisplay__inventory__card"
      }
      onClick={() => {
        setDisplayTarget(cardID);
      }}
    >
      <img src={disp.image} alt="" />
      <div className="inventory__card__info">
        <div className="inventory__card__top">
          <h4>{disp.albumTitle}</h4>
          <h5>{disp.artist}</h5>
          <h5>{disp.year}</h5>
        </div>
        <div className="inventory__card__bottom">
          <h5>
            Sleeve: {gradeDictionary[album.priceEssentials.sleeveCondition]}
          </h5>
          <h5>
            Media: {gradeDictionary[album.priceEssentials.mediaCondition]}
          </h5>
          <h5>${album.priceEssentials.priceTarget}</h5>
        </div>
      </div>
    </div>
  );
}

export default InventoryDisplayCard;
