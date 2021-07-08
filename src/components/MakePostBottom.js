import React, { useState, useEffect } from "react";
import "./MakePostBottom.css";

function MakePostBottom({
  setTaggedAlbums,
  taggedAlbums,
  isAddingAlbum,
  setIsAddingAlbum,
}) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(0);
  const url = `http://localhost:4000/search/?q=artist:"${query}"`;
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  //-----------------------logic and JSX for adding an album--------------

  //logic for when user clicks add album

  //normal bottom of the post component
  const normalCompBottom = (
    <div className="makePost__bottom">
      <div
        onClick={() => {
          setIsAddingAlbum(true);
        }}
        className={
          isAddingAlbum
            ? "makePost__bottom__option__active"
            : "makePost__bottom__option"
        }
      >
        <h3>add album</h3>
      </div>
      <div className="makePost__bottom__option">
        <h3>add photos</h3>
      </div>
    </div>
  );

  const addAlbumPostBottom = (
    <div className="bottom">
      <div className="bottom__textInput">
        <div className="makePost__textInput">
          <input
            type="text"
            placeholder="ATLiens"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <div
            className="makePost__textInput__submit"
            onClick={() => setIsSearching(true)}
          >
            <h3>Submit</h3>
          </div>
        </div>
      </div>
      {result &&
        result.data.map((album) => {
          return (
            <div
              className="bottom__result"
              onClick={() => {
                let localArray = [...taggedAlbums];
                setTaggedAlbums([...localArray, album.id]);
              }}
            >
              <h3>{album.title}</h3>
            </div>
          );
        })}
    </div>
  );

  //---------------------------logic for search--------------------------

  useEffect(() => {
    if (isSearching) {
      console.log("logic for adding album goes here 🏆");
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
      console.log(result.data);
      result.data.map((track) => {
        if (track.artist.name.toLowerCase() === query.toLowerCase()) {
          sortedData.push(track);
        }
      });
    }
  }, [result]);

  return isAddingAlbum ? addAlbumPostBottom : normalCompBottom;
}

export default MakePostBottom;
