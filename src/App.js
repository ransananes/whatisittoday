import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import months from "./data/months.json";
import parse from "html-react-parser";

function App() {
  const [data, setData] = useState("");
  const newDate = new Date();

  useEffect(() => {
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    async function fetchWikipediaData() {
      const url =
        `http://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts&titles=` +
        months[parseInt(month)] +
        " " +
        day +
        `&formatversion=2&rvprop=content&rvslots=*&origin=*`;
      await axios.get(url).then((res) => {
        setData(res.data.query.pages[0].extract);
      });
    }

    fetchWikipediaData();
  }, []);
  return (
    <div className="App">
      <h1> Wikipedia fetch</h1>
      {parse(data)}
    </div>
  );
}

export default App;
