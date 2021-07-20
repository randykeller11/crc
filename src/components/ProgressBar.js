import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

function ProgressBar({
  file,
  _loadedPhotos,
  _setLoadedPhotos,
  _setIsAddingPhoto,
}) {
  const { url, progress } = useStorage(file);

  const translatedProgress = progress === 100 ? "complete" : `${progress}%`;

  useEffect(() => {
    if (url) {
      console.log(url);
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
