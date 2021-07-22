import React, { useEffect, useContext } from "react";
import useStorage from "../hooks/useStorage";
import { postContext } from "./MakePost";

function ProgressBar({
  file,
  _loadedPhotos,
  _setLoadedPhotos,
  _setIsAddingPhoto,
}) {
  const { url, progress } = useStorage(file);
  const { post, postDispatch } = useContext(postContext);

  const translatedProgress = progress === 100 ? "complete" : `${progress}%`;

  useEffect(() => {
    if (url) {
      console.log(url);
      let localArray = [...post.photos];
      localArray.push(url);
      postDispatch({
        type: "update",
        payload: { location: "photos", updateValue: localArray },
      });
      _setIsAddingPhoto(false);
    }
  }, [url]);

  return (
    <div className="progress-bar">
      <h1>progressbar: {translatedProgress} </h1>
      {url && <img src={url} />}
    </div>
  );
}

export default ProgressBar;
