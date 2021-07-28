import React from "react";
import "./WatchlistAlbum.css";

function WatchlistAlbum({ _album, _index }) {
  if (_album === 0) {
    return (
      <div className="album">
        <h1>no album loaded: {_index}</h1>
      </div>
    );
  }
  return (
    <div className="album">
      <h1>{_album.title}</h1>
    </div>
  );
}

export default WatchlistAlbum;
