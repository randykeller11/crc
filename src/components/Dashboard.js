import React, { useState, useEffect } from "react";
import db from "../config/firebase";

function Dashboard() {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    db.collection("test").onSnapshot((snapshot) => {
      setTestData(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default Dashboard;
