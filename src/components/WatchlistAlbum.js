import React from "react";
import "./WatchlistAlbum.css";

function WatchlistAlbum({ _album, _index, setSearchTarget }) {
  if (_album === 0) {
    return (
      <div
        className="placeholderAlbum"
        onClick={() => {
          setSearchTarget(_index);
        }}
      >
        <img
          src="https://www.northernsun.com/images/image16x16/576x576/0010.png"
          alt=""
        />

        <h5>{_index}</h5>
      </div>
    );
  }
  return (
    <div className="album">
      <h4 className="delete">x</h4>
      <img src={`${_album.cover}`} alt="" />
      <h4>{_album.title}</h4>
      <h5>{_album.artist}</h5>
    </div>
  );
}

export default WatchlistAlbum;
