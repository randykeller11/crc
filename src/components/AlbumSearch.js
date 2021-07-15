import React, { useState, useEffect } from "react";
import "./AlbumSearch.css";

function AlbumSearch({ _taggedAlbums, _setTaggedAlbums, _setIsAddingAlbum }) {
  const [sortedData, setSortedData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(0);
  const url = `http://localhost:4000/search/?q=album:"${query}"`;
  const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  //---------------------------logic for search--------------------------

  useEffect(() => {
    if (isSearching) {
      async function getData() {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setResult(data);
        } catch (error) {
          console.error("error from fetch: ", error);
          setError(error.message);
        }
      }

      //get data if user is searching
      if (isSearching) {
        setSortedData([]);
        setResult(null);
        getData(url);
        setIsSearching(false);
      }
    }
  }, [isSearching]);

  //sort the data for matching artists
  useEffect(() => {
    if (result) {
      let localArray = [];
      result.data.map((track, index) => {
        if (
          localArray.filter((album) => album.id === track.album.id).length ===
            0 &&
          localArray.filter((album) => album.title === track.album.title)
            .length === 0
        ) {
          localArray.push({
            id: track.album.id,
            title: track.album.title,
            artist: track.artist.name,
            cover: track.album.cover_small,
          });
        }
      });
      setSortedData(localArray);
    }
  }, [result]);

  return (
    <div className="albumSearch">
      <div className="albumSearch__console">
        <input
          type="text"
          placeholder="ATLiens"
          value={query}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              setIsSearching(true);
            }
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (query.length < 7) {
              setIsSearching(false);
              setSortedData([]);
              setResult(null);
            }
            if (query.length >= 7) {
              setIsSearching(false);
              setIsSearching(true);
            }
          }}
        />
        <div className="albumSearch__console__toggleActive">Album</div>
        <div className="albumSearch__console__toggle">Artist</div>
        <div
          className="terminateSearch"
          onClick={() => {
            _setIsAddingAlbum(false);
            setSortedData([]);
            setResult(null);
            setQuery("");
          }}
        >
          <h4>x</h4>
        </div>
      </div>
      {sortedData &&
        sortedData.map((album, index) => {
          return (
            <div
              className="albumSearch__result"
              key={`${index}`}
              onClick={() => {
                _setTaggedAlbums([..._taggedAlbums, album]);
                _setIsAddingAlbum(false);
                setSortedData([]);
                setResult(null);
                setQuery("");
              }}
            >
              <img src={album.cover} />
              <h3>
                {album.title} - {album.artist} - {album.id}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default AlbumSearch;
