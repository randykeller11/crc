import React, { useState, useEffect } from "react";
import { getMasterVersions } from "./helperFunctions";
import "./PickAlbumVersion.css";

function PickAlbumVersion({ setResult, masterResult }) {
  const [masterVersions, setMasterVersions] = useState(null);
  const [showAllOptions, setShowAllOptions] = useState(false);

  useEffect(() => {
    getMasterVersions(masterResult.value.master_url, setMasterVersions);
  }, []);
  return (
    <div className="pickVersion">
      {!showAllOptions && (
        <h3
          onClick={() => {
            setShowAllOptions(true);
          }}
        >
          show all
        </h3>
      )}
      {masterVersions &&
        !showAllOptions &&
        masterResult.searchType === 2 &&
        masterVersions.versions.map((version) => {
          if (
            version.catno === masterResult.query.replace("-", " ") ||
            version.catno === masterResult.query
          ) {
            return (
              <div
                className="version__option"
                onClick={() => {
                  setResult(version.resource_url);
                }}
              >
                <h3>{version.title}</h3>
                <h3>{version.label}</h3>
                <h3>{version.released}</h3>
                <h3>Format: {version.format}</h3>
                <h3>Cat#:{version.catno}</h3>
                <h3>Country:{version.country}</h3>
              </div>
            );
          }
        })}
      {showAllOptions &&
        masterVersions.versions.map((version) => (
          <div
            className="version__option"
            onClick={() => {
              setResult(version.resource_url);
            }}
          >
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
