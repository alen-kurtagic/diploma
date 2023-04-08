import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Create a new root for a React component tree that will be rendered using
// concurrent mode. Concurrent rendering is a feature in React that allows
// splitting the rendering work into smallen chunks.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
