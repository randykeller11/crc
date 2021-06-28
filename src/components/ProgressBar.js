import React from "react";
import useStorage from "../hooks/useStorage";

function ProgressBar({ file, setFile }) {
  const { url, progress } = useStorage(file);
  console.log(progress, url);

  const translatedProgress = progress === 100 ? "complete" : `${progress}%`;
  return (
    <div className="progress-bar">
      <h1>progressbar: {translatedProgress} </h1>
      {url && <img src={url} />}
    </div>
  );
}

export default ProgressBar;
