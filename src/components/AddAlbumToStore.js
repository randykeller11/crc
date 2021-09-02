import React, { useState, useEffect } from "react";
import DiscogsSearch from "./DiscogsSearch";
import "./AddAlbumToStore.css";
import PickAlbumVersion from "./PickAlbumVersion";
import { getReleaseData } from "./helperFunctions";

function AddAlbumToStore({ setAddAlbumMode, setNewAlbumObject }) {
  const [sleeveCondition, setSleeveCondition] = useState(5);
  const [mediaCondition, setMediaCondition] = useState(5);
  const [priceTarget, setPriceTarget] = useState(null);
  const [isSearching, setIsSearching] = useState(true);
  const [masterResult, setMasterResult] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [albumImage, setAlbumImage] = useState(null);
  const [releaseURL, setReleaseURL] = useState(null);

  useEffect(() => {
    if (isSubmitted) {
      const objectToSubmit = {
        masterImage: albumImage,
        albumData: searchResult,
        sleeveCondition: sleeveCondition,
        mediaCondition: mediaCondition,
        priceTarget: priceTarget,
      };
      setNewAlbumObject(objectToSubmit);
      setAddAlbumMode(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (releaseURL) {
      setAlbumImage(masterResult.value.cover_image);
      getReleaseData(releaseURL, setSearchResult);
    }
  }, [releaseURL]);

  const componentBottom = (
    <>
      <div className="conditionOptions">
        <label>Sleeve Condition: </label>
        <select
          id="condition"
          onChange={(e) => {
            setSleeveCondition(e.target.value);
          }}
        >
          <option value={1}>M</option>
          <option value={2}>NM</option>
          <option value={3}>VG+</option>
          <option value={4}>VG</option>
          <option value={5}>G+</option>
        </select>
        <label>Media Condition: </label>
        <select
          id="condition"
          onChange={(e) => {
            setMediaCondition(e.target.value);
          }}
        >
          <option value={1}>M</option>
          <option value={2}>NM</option>
          <option value={3}>VG+</option>
          <option value={4}>VG</option>
          <option value={5}>G+</option>
        </select>
      </div>
      <div className="priceInput">
        <input
          type="number"
          placeholder="$"
          value={priceTarget}
          onChange={(e) => {
            e.preventDefault();
            setPriceTarget(e.target.value);
          }}
        />
      </div>

      <button onClick={() => setIsSubmitted(true)}>Submit</button>
    </>
  );

  return (
    <div className="addAlbum">
      {isSearching && (
        <>
          {
            <DiscogsSearch
              setIsSearching={setIsSearching}
              setResult={setMasterResult}
            />
          }
        </>
      )}

      {!isSearching && masterResult && (
        <div className="albumCard">
          <img src={masterResult.value.cover_image} alt="" />
          <div className="albumInfo">
            <h3>{masterResult.value.title}</h3>
            <h4>{masterResult.value.year}</h4>
            {searchResult ? (
              componentBottom
            ) : (
              <PickAlbumVersion
                setResult={setReleaseURL}
                masterResult={masterResult}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAlbumToStore;
