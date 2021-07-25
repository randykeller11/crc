import React, { useState, useEffect, useContext, useRef } from "react";
import "./MakePostBottom.css";
import AlbumSearch from "./AlbumSearch";
import { postContext } from "./MakePost";
import ProgressBar from "./ProgressBar";

function MakePostBottom({ isAddingAlbum, setIsAddingAlbum }) {
  const [query, setQuery] = useState("");
  const url = `http://localhost:4000/search/?q=album:"${query}"`;

  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  const { post, postDispatch } = useContext(postContext);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [useProgressBar, setUseProgressBar] = useState(false);
  const photoInput = useRef(null);

  const allowedTypes = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    setIsAddingPhoto(true);
    let selected = e.target.files[0];
    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  useEffect(() => {
    if (file) {
      setUseProgressBar(true);
    }
  }, [file]);

  //-----------------------logic and JSX for adding an album--------------

  const addPhotoJSX = (
    <div
      className={
        isAddingPhoto
          ? "makePost__bottom__option__active"
          : "makePost__bottom__option"
      }
    >
      <form>
        <input
          type="file"
          id="add_photo"
          onChange={changeHandler}
          ref={photoInput}
          style={{ display: "none" }}
        />
        <div
          className="input_button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            photoInput.current.click();
          }}
        >
          {!useProgressBar && <h3>add photos</h3>}
        </div>
        <div className="output">
          {/* {error && <div className="error">{error}</div>}
    {file && <div>{file.name}</div>} */}
          {useProgressBar && (
            <ProgressBar
              file={file}
              _setIsAddingPhoto={setIsAddingPhoto}
              _setUseProgressBar={setUseProgressBar}
            />
          )}
        </div>
      </form>
    </div>
  );

  //normal bottom of the post component
  const normalCompBottom =
    post.albums.length === 5 ? (
      <div className="makePost__bottom">
        <div className="makePost__bottom__option__inactive">
          <h3>max albums tagged</h3>
        </div>
        {addPhotoJSX}
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
        {addPhotoJSX}
      </div>
    );

  if (isAddingAlbum) {
    return <AlbumSearch _setIsAddingAlbum={setIsAddingAlbum} />;
  } else {
    return normalCompBottom;
  }
}

export default MakePostBottom;
