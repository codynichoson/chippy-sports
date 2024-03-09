import React from "react";
import { Link } from "react-router-dom";
import "../styles/LeagueMenuBar.css";

const LeagueMenuBar = () => {
  return (
    <div className="league-menu-bar">
      <Link to="./schedule" className="league-menu-bar-item">
        Schedule
      </Link>
      <Link to="./standings" className="league-menu-bar-item">
        Standings
      </Link>
      <Link to="./stats" className="league-menu-bar-item">
        Stats
      </Link>
      <Link to="./teams" className="league-menu-bar-item">
        Teams
      </Link>
      <Link to="./about" className="league-menu-bar-item">
        About
      </Link>
    </div>
  );
};

export default LeagueMenuBar;
