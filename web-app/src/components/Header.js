import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import colors from "../colors";

function Header() {
  return (
    <header style={{ backgroundColor: colors.primary, color: "#fff" }}>
      <Link to="/">
        <h1 className="header-text">CHIRP SPORTS</h1>
      </Link>
    </header>
  );
}

export default Header;
