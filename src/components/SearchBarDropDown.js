import React from "react";
import "./SearchBarDropDown.css";

function SearchBarDropDown({ _isAlbumSearch, _index, dispatch, displayValue }) {
  return (
    <div className="dropDown">
      <img src={displayValue.strArtistThumb} alt="" />
      <h3>{displayValue.strArtist}</h3>
    </div>
  );
}

export default SearchBarDropDown;
