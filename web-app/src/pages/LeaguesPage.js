import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LeaguesPage.css"; // You can create a CSS file for styling

const LeaguesPage = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Fetch league data from the backend
    fetch("http://localhost:3001/leagues")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched league data:", data);
        setLeagues(data);
      })
      .catch((error) => console.error("Error fetching league data:", error));
  }, []);

  // Sort leagues alphabetically by name
  const sortedLeagues = [...leagues].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="leagues-container">
      {sortedLeagues.map((league) => (
        <Link to={league.link} key={league.id} className="league-box">
          <div className="rounded-rectangle">
            <p className="league-abbrev">{league.abbrev}</p>
            <p className="league-name">{league.name}</p>
            <p className="league-countries">{league.countries.join(", ")}</p>
            {/* Add other league information as needed */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeaguesPage;
