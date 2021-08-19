import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CRCInvSearch from "./CRCInvSearch";
import "./AddAlbumToStore.css";

function AddAlbumToStore({ setAddAlbumMode, setNewAlbumObject }) {
  const [condition, setCondition] = useState("M");
  const [formatTags, setFormatTags] = useState(null);
  const [priceTarget, setPriceTarget] = useState(null);
  const [albumUPC, setAlbumUPC] = useState(null);
  const [isSearching, setIsSearching] = useState(true);
  const [searchResult, setSearchResult] = useState({
    strAlbum: "",
    strArtist: "",
    intYearReleased: "",
    strLabel: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lowPrice, setLowPrice] = useState(null);
  const [highPrice, setHighPrice] = useState(null);
  const [infoSource, setInfoSource] = useState("albumPages");
  const [albumImage, setAlbumImage] = useState(null);

  useEffect(() => {
    if (isSubmitted) {
      function removeNullProperties(obj) {
        Object.keys(obj).forEach((key) => {
          let value = obj[key];
          let hasProperties = value && Object.keys(value).length > 0;
          if (value === null) {
            delete obj[key];
          } else if (typeof value !== "string" && hasProperties) {
            removeNullProperties(value);
          } else if (key === "strDescriptionEN") {
            delete obj[key];
          }
        });
        return obj;
      }

      let cleanAlbumData = removeNullProperties(searchResult);

      if (infoSource === "user") {
        cleanAlbumData.strAlbumThumb = albumImage;
      }

      if (infoSource === "albumPages") {
        cleanAlbumData = {
          ...cleanAlbumData.albumInfo,
          docID: cleanAlbumData.docID,
        };
      }

      let formattedPriceTarget = lowPrice
        ? { high: highPrice, low: lowPrice }
        : priceTarget;

      const objectToSubmit = {
        albumData: cleanAlbumData,
        condition: condition,
        formatTags: formatTags,
        priceTarget: formattedPriceTarget,
        albumUPC: albumUPC,
        infoSource: infoSource,
      };
      setNewAlbumObject(objectToSubmit);
      setAddAlbumMode(false);
    }
  }, [isSubmitted]);

  const componentBottom = (
    <>
      <div className="conditionOptions">
        <label>Condition: </label>
        <select
          id="condition"
          onChange={(e) => {
            setCondition(e.target.value);
          }}
        >
          <option value="M">M</option>
          <option value="NM">NM</option>
          <option value="VG+">VG+</option>
          <option value="VG">VG</option>
          <option value="G+">G+</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="FormatTags"
        value={formatTags}
        onChange={(e) => {
          e.preventDefault();
          setFormatTags(e.target.value);
        }}
      />
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
      <input
        type="text"
        placeholder="UPC"
        value={albumUPC}
        onChange={(e) => {
          e.preventDefault();
          setAlbumUPC(e.target.value);
        }}
      />
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
          {infoSource === "audioDB" && (
            <h5
              onClick={() => {
                setInfoSource("user");
                setIsSearching(false);
              }}
            >
              Still don't see your album?
            </h5>
          )}
          {infoSource === "albumPages" && (
            <CRCInvSearch
              setIsSearching={setIsSearching}
              setResult={setSearchResult}
            />
          )}
          {infoSource === "audioDB" && (
            <SearchBar
              setIsSearching={setIsSearching}
              setResult={setSearchResult}
            />
          )}
        </>
      )}
      {!isSearching && searchResult && infoSource === "albumPages" && (
        <div className="albumCard">
          <img src={searchResult.albumInfo.strAlbumThumb} alt="" />
          <div className="albumInfo">
            <h3>{searchResult.albumInfo.strAlbum}</h3>
            <h3>{searchResult.albumInfo.strArtist}</h3>
            <h4>{searchResult.albumInfo.intYearReleased}</h4>
            <h3>{searchResult.albumInfo.strLabel}</h3>
            {componentBottom}
          </div>
        </div>
      )}
      {!isSearching && searchResult && infoSource === "audioDB" && (
        <div className="albumCard">
          <img src={searchResult.strAlbumThumb} alt="" />
          <div className="albumInfo">
            <h3>{searchResult.strAlbum}</h3>
            <h3>{searchResult.strArtist}</h3>
            <h4>{searchResult.intYearReleased}</h4>
            <h3>{searchResult.strLabel}</h3>
            {componentBottom}
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
