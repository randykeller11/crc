import React, { useState, useEffect, useContext } from "react";
import "./MakePostBottom.css";
import AlbumSearch from "./AlbumSearch";
import PhotoUpload from "./PhotoUpload";
import { postContext } from "./MakePost";

function MakePostBottom({
  setTaggedAlbums,
  taggedAlbums,
  isAddingAlbum,
  setIsAddingAlbum,
}) {
  const [sortedData, setSortedData] = useState([]);
  const [componentState, setComponentState] = useState(0);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(0);
  const url = `http://localhost:4000/search/?q=album:"${query}"`;
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  const { post, postDispatch } = useContext(postContext);

  //-----------------------logic and JSX for adding an album--------------

  //logic for when user clicks add album

  //normal bottom of the post component
  const normalCompBottom =
    post.albums.length === 5 ? (
      <div className="makePost__bottom">
        <div className="makePost__bottom__option__inactive">
          <h3>max albums tagged</h3>
        </div>
        <div
          className={
            isAddingPhoto
              ? "makePost__bottom__option__active"
              : "makePost__bottom__option"
          }
          onClick={() => {
            setIsAddingPhoto(true);
          }}
        >
          <h3>add photos</h3>
        </div>
      </div>
    ) : (
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
        <div
          className={
            isAddingPhoto
              ? "makePost__bottom__option__active"
              : "makePost__bottom__option"
          }
          onClick={() => {
            setIsAddingPhoto(true);
          }}
        >
          <h3>add photos</h3>
        </div>
      </div>
    );

  if (isAddingAlbum) {
    return (
      <AlbumSearch
        _albumList={taggedAlbums}
        _setAlbumList={setTaggedAlbums}
        _setIsAddingAlbum={setIsAddingAlbum}
      />
    );
  } else if (isAddingPhoto) {
    return <PhotoUpload />;
  } else {
    return normalCompBottom;
  }
}

export default MakePostBottom;
