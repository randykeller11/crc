import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./AddAlbumToStore.css";

function AddAlbumToStore({ profileID, setAddAlbumMode, setNewAlbumObject }) {
  const [condition, setCondition] = useState(4);
  const [formatTags, setFormatTags] = useState(null);
  const [priceTarget, setPriceTarget] = useState(null);
  const [albumUPC, setAlbumUPC] = useState(null);
  const [isSearching, setIsSearching] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [priceRangeMode, setPriceRangeMode] = useState(false);
  const [lowPrice, setLowPrice] = useState(null);
  const [highPrice, setHighPrice] = useState(null);

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

      let formattedPriceTarget = lowPrice
        ? { high: highPrice, low: lowPrice }
        : priceTarget;

      const objectToSubmit = {
        albumData: cleanAlbumData,
        condition: condition,
        formatTags: formatTags,
        priceTarget: formattedPriceTarget,
        albumUPC: albumUPC,
      };
      setNewAlbumObject(objectToSubmit);
      setAddAlbumMode(false);
    }
  }, [isSubmitted]);

  return (
    <div className="addAlbum">
      {isSearching && (
        <>
          <h5>dont see your album?</h5>
          <SearchBar
            setIsSearching={setIsSearching}
            setResult={setSearchResult}
          />
        </>
      )}
      {!isSearching && searchResult && (
        <div className="albumCard">
          <img src={searchResult.strAlbumThumb} alt="" />
          <div className="albumInfo">
            <h3>{searchResult.strAlbum}</h3>
            <h3>{searchResult.strArtist}</h3>
            <h4>{searchResult.intYearReleased}</h4>
            <h3>{searchResult.strLabel}</h3>
            <div className="conditionOptions">
              <h1
                onClick={() => {
                  setCondition(1);
                }}
              >
                {condition >= 1 ? "⭐️" : "✩"}
              </h1>
              <h1
                onClick={() => {
                  setCondition(2);
                }}
              >
                {condition >= 2 ? "⭐️" : "✩"}
              </h1>
              <h1
                onClick={() => {
                  setCondition(3);
                }}
              >
                {condition >= 3 ? "⭐️" : "✩"}
              </h1>
              <h1
                onClick={() => {
                  setCondition(4);
                }}
              >
                {condition >= 4 ? "⭐️" : "✩"}
              </h1>
              <h1
                onClick={() => {
                  setCondition(5);
                }}
              >
                {condition === 5 ? "⭐️" : "✩"}
              </h1>
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
              {priceRangeMode ? (
                <>
                  <input
                    type="number"
                    placeholder="$low"
                    value={lowPrice}
                    onChange={(e) => {
                      e.preventDefault();
                      setLowPrice(e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="$high"
                    value={highPrice}
                    onChange={(e) => {
                      e.preventDefault();
                      setHighPrice(e.target.value);
                    }}
                  />
                </>
              ) : (
                <>
                  <h5 onClick={() => setPriceRangeMode(true)}>Set Range</h5>
                  <input
                    type="number"
                    placeholder="$"
                    value={priceTarget}
                    onChange={(e) => {
                      e.preventDefault();
                      setPriceTarget(e.target.value);
                    }}
                  />
                </>
              )}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAlbumToStore;
