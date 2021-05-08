import React from "react";
import { useFetch } from "../hooks/useFetch";

function FetchTest() {
  const url = "https://www.balldontlie.io/api/v1/players";
  const [result, error, isLoading] = useFetch(url);
  return (
    <div>
      {error && <h1>error ocurred</h1>}
      {result &&
        result.data.map((player) => {
          return (
            <div>
              <h1>{player.first_name}</h1>
              <h1>{player.last_name}</h1>
            </div>
          );
        })}
    </div>
  );
}

export default FetchTest;
