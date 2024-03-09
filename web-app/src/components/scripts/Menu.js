import React from "react";
import "../styles/Menu.css";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <header className="menu-bar">
      <nav>
        <ul>
          <li>
            <Link to="/hub">Favorites</Link>
          </li>
          <li>
            <Link to="/sports">Sports</Link>
          </li>
          <li>
            <Link to="/leagues">Leagues</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;
