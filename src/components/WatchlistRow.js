import React from "react";
import "./WatchlistRow.css";
import WatchlistAlbum from "./WatchlistAlbum";

function WatchlistRow({ albums, setSearchTarget }) {
  return (
    <div className="row">
      {albums.map((album) => {
        return (
          <WatchlistAlbum
            _album={album.value}
            key={album.index}
            _index={album.index}
            setSearchTarget={setSearchTarget}
          />
        );
      })}
    </div>
  );
}

export default WatchlistRow;
