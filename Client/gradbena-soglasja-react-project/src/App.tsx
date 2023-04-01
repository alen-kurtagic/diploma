import { useState } from "react";
import Map from "./components/Map";
import "./App.sass";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Confirm from "./components/Confirm";

function App() {
  return (
    <>
      <Header></Header>
      <Map></Map>
      <Confirm></Confirm>
    </>
  );
}

export default App;
