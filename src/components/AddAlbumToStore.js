import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CRCInvSearch from "./CRCInvSearch";
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
  const [infoSource, setInfoSource] = useState("albumPages");
  const [albumImage, setAlbumImage] = useState(null);
  const [releaseURL, setReleaseURL] = useState(null);

  useEffect(() => {
    if (isSubmitted) {
      if (infoSource === "albumPages") {
        setAlbumImage(searchResult.image);
        setSearchResult({
          ...searchResult,
          docID: searchResult.docID,
        });
      }

      const objectToSubmit = {
        masterImage: albumImage,
        albumData: searchResult,
        sleeveCondition: sleeveCondition,
        mediaCondition: mediaCondition,
        priceTarget: priceTarget,
        infoSource: infoSource,
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
          {infoSource === "albumPages" && (
            <h5
              onClick={() => {
                setInfoSource("audioDB");
              }}
            >
              Don't see your album?
            </h5>
          )}
          {infoSource === "albumPages" && (
            <CRCInvSearch
              setIsSearching={setIsSearching}
              setResult={setSearchResult}
            />
          )}
          {infoSource === "audioDB" && (
            <DiscogsSearch
              setIsSearching={setIsSearching}
              setResult={setMasterResult}
            />
          )}
        </>
      )}
      {!isSearching && searchResult && infoSource === "albumPages" && (
        <div className="albumCard">
          <img src={searchResult.cover_image} alt="" />
          <div className="albumInfo">
            <h3>{searchResult.title}</h3>
            <h4>{searchResult.albumInfo.intYearReleased}</h4>
            <h3>{searchResult.albumInfo.strLabel}</h3>
            {componentBottom}
          </div>
        </div>
      )}
      {!isSearching && masterResult && infoSource === "audioDB" && (
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
      {!isSearching && infoSource === "user" && (
        <div className="albumCard">
          {!albumImage ? (
            <button
              onClick={() => {
                setAlbumImage(searchResult.strAlbumThumb);
              }}
            >
              add image
            </button>
          ) : (
            <img src={albumImage} />
          )}
          <div className="albumInfo">
            <input
              type="text"
              placeholder="album image"
              value={albumImage}
              onChange={(e) => {
                e.preventDefault();
                setSearchResult({
                  ...searchResult,
                  strAlbumThumb: e.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="album title"
              value={searchResult.strAlbum}
              onChange={(e) => {
                e.preventDefault();
                setSearchResult({ ...searchResult, strAlbum: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="artist"
              value={searchResult.strArtist}
              onChange={(e) => {
                e.preventDefault();
                setSearchResult({ ...searchResult, strArtist: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="release year"
              value={searchResult.intYearReleased}
              onChange={(e) => {
                e.preventDefault();
                setSearchResult({
                  ...searchResult,
                  intYearReleased: e.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="label"
              value={searchResult.strLabel}
              onChange={(e) => {
                e.preventDefault();
                setSearchResult({ ...searchResult, strLabel: e.target.value });
              }}
            />
            {componentBottom}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAlbumToStore;
