import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./config/firebase";
import { useFetch } from "./hooks/useFetch";
import LandingPage from "./components/LandingPage";

function App() {
  const url = "https://www.balldontlie.io/api/v1/players";
  const [result, error, isLoading] = useFetch(url);
  console.log(result, error);

  const [testData, setTestData] = useState([]);

  useEffect(() => {
    console.log("this ran");
    db.collection("test").onSnapshot((snapshot) => {
      setTestData(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);

  useEffect(() => {
    if (result) {
      console.log(result);
    }
  }, [result]);

  return (
    //BEM
    <div className="app">
      <LandingPage />
      {/* {error && <h1>error ocurred</h1>}
      {result &&
        result.data.map((player) => {
          return (
            <div>
              <h1>{player.first_name}</h1>
              <h1>{player.last_name}</h1>
            </div>
          );
        })} */}
    </div>
  );
}

export default App;
