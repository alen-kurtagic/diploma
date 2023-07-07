import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "src/pages/Home/HomePage";
import TractPage from "src/pages/Tract/TractPage";

const queryClient = new QueryClient();

// Create a new root for a React component tree that will be rendered using
// concurrent mode. Concurrent rendering is a feature in React that allows
// splitting the rendering work into smallen chunks.

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tract" element={<TractPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
