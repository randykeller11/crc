import React, { useState, useEffect } from "react";
import { getMasterVersions } from "./helperFunctions";
import "./PickAlbumVersion.css";

function PickAlbumVersion({ setResult, masterURL }) {
  const [masterVersions, setMasterVersions] = useState(null);

  useEffect(() => {
    getMasterVersions(masterURL, setMasterVersions);
  }, []);
  return (
    <div className="pickVersion">
      {masterVersions &&
        masterVersions.versions.map((version) => (
          <div className="version__option">
            <h3>{version.title}</h3>
            <h3>{version.label}</h3>
            <h3>{version.released}</h3>
            <h3>Format: {version.format}</h3>
            <h3>Cat#:{version.catno}</h3>
            <h3>Country:{version.country}</h3>
          </div>
        ))}
    </div>
  );
}

export default PickAlbumVersion;
