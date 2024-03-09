import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1 className="header-text">CHIPPY SPORTS</h1>
      </Link>
    </header>
  );
}

export default Header;
