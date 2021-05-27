import React, { useState, useEffect } from "react";

function SearchTest() {
  const [query, setQuery] = useState("");
  const url = `http://localhost:4000/search/?q=artist:"${query}"`;

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("error from fetch: ", error);
        setError(error.message);
      }
      setIsLoading(false);
    }

    //get data if user is searching
    if (isSearching) {
      setSortedData([]);
      setResult(null);
      getData(url);
      setIsSearching(false);
    }
  }, [isSearching]);

  //sort the data for matching artists
  useEffect(() => {
    if (result) {
      console.log(result.data);
      result.data.map((track) => {
        if (track.artist.name.toLowerCase() === query.toLowerCase()) {
          sortedData.push(track);
        }
      });
    }
  }, [result]);

  // if (isLoading) return <h2>Loading...</h2>;

  const renderResults = () => {
    if (sortedData.length > 0) {
      return sortedData.map((item) => (
        <div className="searchCard">
          <h1>{item.artist.name}</h1>
          <img src={item.album.cover_big} alt="" />
        </div>
      ));
    } else if (sortedData.length === 0 && result) {
      return result.data.map((item) => (
        <div className="searchCard">
          <h1>{item.artist.name}</h1>
          <img src={item.album.cover_big} alt="" />
        </div>
      ));
    }
  };

  return (
    //BEM
    <div className="app">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={() => {
          setIsSearching(true);
        }}
      >
        Submit
      </button>
      {error && <p>Error: {error}</p>}
      {renderResults()}
    </div>
  );
}

export default SearchTest;
