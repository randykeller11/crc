import React, { useState } from "react";
import "./SearchBarDropDown.css";

function SearchBarDropDown({
  _isAlbumSearch,
  _index,
  dispatch,
  displayValue,
  artistURL,
  setIsSearching,
  setResult,
  fullValue,
}) {
  const artistSearchMode = (
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

  const handleAlbumClick = () => {
    setResult(fullValue);
    setIsSearching(false);

    // console.log("clicked");
  };

  const albumSearchMode = (
    <div className="dropDown" onClick={handleAlbumClick}>
      <img src={displayValue.strAlbumThumb} alt="" />
      <h3>{displayValue.strAlbum}</h3>
      {/* <h5>{displayValue}</h5> */}
    </div>
  );

  return _isAlbumSearch ? albumSearchMode : artistSearchMode;
}

export default SearchBarDropDown;
