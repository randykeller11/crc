import React from "react";
import "./WatchlistRow.css";
import WatchlistAlbum from "./WatchlistAlbum";

function WatchlistRow({ albums }) {
  return (
    <div className="row">
      {albums.map((album) => {
        return (
          <WatchlistAlbum
            _album={album.value}
            key={album.index}
            _index={album.index}
          />
        );
      })}
    </div>
  );
}

export default WatchlistRow;
