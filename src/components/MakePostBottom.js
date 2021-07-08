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

  //logic for when user clicks add album
  useEffect(() => {
    if (isAddingAlbum) {
      console.log("logic for adding album goes here 🏆");
    }
  }, [isAddingAlbum]);

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

            //   onClick={() => setIsSubmitted(true)}
          >
            <h3>Submit</h3>
          </div>
        </div>
      </div>
      {taggedAlbums.map((album) => {
        return (
          <div className="bottom__result">
            <h3>search result card goes here 🏆</h3>
          </div>
        );
      })}
    </div>
  );

  return isAddingAlbum ? addAlbumPostBottom : normalCompBottom;
}

export default MakePostBottom;
