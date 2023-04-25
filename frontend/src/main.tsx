import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "src/pages/Home/HomePage";
import DetailsPage from "src/pages/Details/DetailsPage";

// Create a new root for a React component tree that will be rendered using
// concurrent mode. Concurrent rendering is a feature in React that allows
// splitting the rendering work into smallen chunks.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
