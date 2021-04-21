import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./config/firebase";

function App() {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    console.log("this ran");
    db.collection("test").onSnapshot((snapshot) => {
      setTestData(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);

  return (
    //BEM
    <div className="app">
      <h1>connected</h1>
    </div>
  );
}

export default App;
