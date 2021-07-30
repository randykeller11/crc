import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import "./StorePortal.css";

function StorePortal() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  return (
    <div>
      <h1>welcome to the store portal </h1>
      <button
        onClick={() => {
          setIsSearching(true);
        }}
      >
        Search
      </button>
      {isSearching && (
        <div className="searchBarComponent">
          <SearchBar isSearching={isSearching} searchResult={setSearchResult} />
        </div>
      )}
    </div>
  );
}

export default StorePortal;
