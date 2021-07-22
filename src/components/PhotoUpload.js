import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

function PhotoUpload({ _setIsAddingPhoto }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [useProgressBar, setUseProgressBar] = useState(false);
  const photoInput = useRef(null);

  const allowedTypes = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
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

  return (
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
        <h1>Click to add photo</h1>
      </div>
      <div className="output">
        {/* {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>} */}
        {useProgressBar && (
          <ProgressBar file={file} _setIsAddingPhoto={_setIsAddingPhoto} />
        )}
      </div>
    </form>
  );
}

export default PhotoUpload;
