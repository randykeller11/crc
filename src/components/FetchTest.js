import React from "react";
import { useFetch } from "../hooks/useFetch";

function FetchTest() {
  const url = "http://localhost:4000/album/302127";
  const [result, error, isLoading] = useFetch(url);
  return (
    <div>
      {error && <h1>error ocurred</h1>}
      {result && <h1>🏆🏆🏆🏆🏆🏆🏆🏆🏆</h1>}
    </div>
  );
}

export default FetchTest;
