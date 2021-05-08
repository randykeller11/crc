import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./config/firebase";
import LandingPage from "./components/LandingPage";
import FetchTest from "./components/FetchTest";

function App() {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    db.collection("test").onSnapshot((snapshot) => {
      setTestData(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);

  return (
    //BEM
    <div className="app">
      <LandingPage />
      <FetchTest />
    </div>
  );
}

export default App;
