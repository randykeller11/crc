import React from "react";

function WatchlistAlbum({ _album, _index }) {
  if (_album === 0) {
    return <h1>no album loaded: {_index}</h1>;
  }
  return <h1>{_album.title}</h1>;
}

export default WatchlistAlbum;
