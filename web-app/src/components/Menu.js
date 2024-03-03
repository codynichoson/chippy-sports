import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <header className="menu-bar">
      <nav>
        <ul>
          <li>
            <Link to="/sports">Sports</Link>
          </li>
          <li>
            <Link to="/leagues">Leagues</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;
