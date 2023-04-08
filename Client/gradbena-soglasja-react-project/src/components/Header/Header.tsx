import React from "react";
import Search from "../Search/Search";

const Header = () => {
  return (
    <div className="header">
      <span className="titles">
        <p className="h2">Gradbena soglasja</p>
        <p className="font-weight-bold">
          Prikaži vsa potrebna javno dostopna prostorska soglasja
        </p>
      </span>
      <Search></Search>
    </div>
  );
};

export default Header;
