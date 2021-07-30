import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

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
        <SearchBar isSearching={isSearching} searchResult={setSearchResult} />
      )}
    </div>
  );
}

export default StorePortal;
