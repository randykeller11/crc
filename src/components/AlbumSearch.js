import React, { useState, useEffect } from "react";
import "./AlbumSearch.css";

function AlbumSearch({ _taggedAlbums, _setTaggedAlbums, _setIsAddingAlbum }) {
  const [sortedData, setSortedData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(0);
  const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [artistSearch, setArtistSearch] = useState(false);

  //urls for different search modes 0 === album search 1 === artist search

  //---------------------------logic for search--------------------------
  async function getData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("error from fetch: ", error);
      setError(error.message);
    }
  }

  useEffect(() => {
    if (isSearching) {
      //get data if user is searching
      if (isSearching) {
        let url =
          searchType === 0
            ? `http://localhost:4000/search/?q=album:"${query}"`
            : `http://localhost:4000/search/?q=artist:"${query}"`;
        setSortedData([]);
        setResult(null);
        getData(url);
        setIsSearching(false);
      }
    }
  }, [isSearching]);

  //sort the data for matching artists
  useEffect(() => {
    if (result && searchType === 0) {
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
    } else if (result && searchType === 1) {
      let localArray = [];
      result.data.map((track, index) => {
        if (
          track.artist.name.toLowerCase() === query.toLowerCase() &&
          localArray.filter((artist) => artist.id === track.artist.id)
            .length === 0 &&
          localArray.filter((artist) => artist.name === track.artist.name)
            .length === 0
        ) {
          localArray.push({
            deezerURL: track.artist.link,
            name: track.artist.name,
            picture: track.artist.picture_small,
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
        <div
          className={
            searchType === 0
              ? "albumSearch__console__toggleActive"
              : "albumSearch__console__toggle"
          }
          onClick={() => {
            setSearchType(0);
          }}
        >
          Album
        </div>
        <div
          className={
            searchType === 1
              ? "albumSearch__console__toggleActive"
              : "albumSearch__console__toggle"
          }
          onClick={() => {
            setSearchType(1);
          }}
        >
          Artist
        </div>
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
        searchType === 0 &&
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
      {sortedData &&
        searchType === 1 &&
        sortedData.map((artist, index) => {
          return (
            <div
              className="albumSearch__result"
              key={`${index}`}
              // onClick={() => {
              //   _setTaggedAlbums([..._taggedAlbums, album]);
              //   _setIsAddingAlbum(false);
              //   setSortedData([]);
              //   setResult(null);
              //   setQuery("");
              // }}
            >
              <img src={artist.picture} />
              <h3>{artist.name}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default AlbumSearch;
