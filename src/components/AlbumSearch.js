import React, { useState, useEffect, useContext } from "react";
import "./AlbumSearch.css";

function AlbumSearch({ _albumList, _setAlbumList, _setIsAddingAlbum }) {
  const [sortedData, setSortedData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(0);
  const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [artistURL, setArtistURL] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);
  const [albumURL, setAlbumURL] = useState(null);
  const [targetAlbumData, setTargetAlbumData] = useState(null);

  //urls for different search modes 0 === album search 1 === artist search

  //---------------------------logic for search--------------------------

  useEffect(() => {
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
      setResult(null);
    } else if (result && searchType === 1) {
      setArtistAlbums(null);
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
      setResult(null);
    }
  }, [result]);

  //use effect to gather artist album data when user clicks on an artist

  useEffect(() => {
    async function getArtistAlbums(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setArtistAlbums(data);
      } catch (error) {
        console.error("error from fetch: ", error);
        setError(error.message);
      }
    }
    if (artistURL) {
      getArtistAlbums(
        artistURL
          .replace("https://www.deezer.com", "http://localhost:4000")
          .concat("/albums")
      );
    }
  }, [artistURL]);

  //use effect to gather artist album data when user clicks on an artist

  useEffect(() => {
    async function getAlbumData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTargetAlbumData(data);
      } catch (error) {
        console.error("error from fetch: ", error);
        setError(error.message);
      }
    }
    if (albumURL) {
      getAlbumData(`http://localhost:4000/album/${albumURL}`);
    }
  }, [albumURL]);

  useEffect(() => {
    if (targetAlbumData) {
      let _albumObject = {
        id: targetAlbumData.id,
        title: targetAlbumData.title,
        artist: targetAlbumData.artist.name,
        cover: targetAlbumData.cover_small,
        genreID: targetAlbumData.genres.data[0].id,
        genreName: targetAlbumData.genres.data[0].name,
        released: targetAlbumData.release_date,
      };
      let localArray = [..._albumList];
      localArray.push(_albumObject);

      _setAlbumList(localArray);
      _setIsAddingAlbum(false);
    }
  }, [targetAlbumData]);

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
              setArtistAlbums(null);
              setIsSearching(false);
              setSortedData([]);
              setResult(null);
            }
            if (query.length >= 7) {
              setArtistAlbums(null);
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
                // console.log(album);
                setAlbumURL(album.id);

                setSortedData([]);
                setResult(null);
                setQuery("");
              }}
            >
              <img src={album.cover} />
              <h3>
                {album.title} - {album.artist}
              </h3>
            </div>
          );
        })}
      {sortedData &&
        searchType === 1 &&
        sortedData.map((artist, index) => {
          return (
            <div
              className={
                artistAlbums
                  ? "albumSearch__result__active"
                  : "albumSearch__result"
              }
              key={`${index}`}
              onClick={() => {
                setArtistURL(artist.deezerURL);
              }}
            >
              <img src={artist.picture} />
              <h3>{artist.name}</h3>
            </div>
          );
        })}
      {artistAlbums &&
        artistAlbums.data.map((album) => {
          return (
            <div
              className="albumSearch__result"
              onClick={() => {
                setAlbumURL(album.id);
                setSortedData([]);
                setResult(null);
                setQuery("");
              }}
            >
              <img src={album.cover_small} />
              <h3>{album.title}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default AlbumSearch;
