import React, { useState } from "react";
import "./SearchBarDropDown.css";

function SearchBarDropDown({
  _isAlbumSearch,
  _index,
  dispatch,
  displayValue,
  artistURL,
}) {
  return (
    <>
      {artistURL ? (
        <div className="dropDown__clicked">
          <img src={displayValue.strArtistThumb} alt="" />
          <h3>{displayValue.strArtist}</h3>
        </div>
      ) : (
        <div
          className="dropDown"
          onClick={() => {
            dispatch({
              type: "update",
              payload: {
                location: "artistURL",
                updateValue: displayValue.idArtist,
              },
            });
          }}
        >
          <img src={displayValue.strArtistThumb} alt="" />
          <h3>{displayValue.strArtist}</h3>
        </div>
      )}
    </>
  );
}

export default SearchBarDropDown;
