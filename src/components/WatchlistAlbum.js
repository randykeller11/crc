import React from "react";
import "./WatchlistAlbum.css";

function WatchlistAlbum({ _album, _index, setSearchTarget }) {
  if (_album === 0) {
    return (
      <div
        className="album"
        onClick={() => {
          setSearchTarget(_index);
        }}
      >
        <h1>no album loaded: {_index}</h1>
      </div>
    );
  }
  return (
    <div className="album">
      <img src={`${_album.cover}`} alt="" />
      <h3>{_album.title}</h3>
      <h5>{_album.artist}</h5>
    </div>
  );
}

export default WatchlistAlbum;
