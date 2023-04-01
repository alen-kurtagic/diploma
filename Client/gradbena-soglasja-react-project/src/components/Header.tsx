import React from "react";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header">
      <span className="titles">
        <p className="h2">Gradbena soglasja</p>
        <p className="lead">
          Prikaži vsa potrebna javno dostopna prostorska soglasja
        </p>
      </span>
      <Search></Search>
    </div>
  );
};

export default Header;