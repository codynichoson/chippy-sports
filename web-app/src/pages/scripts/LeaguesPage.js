import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LeaguesPage.css";

const LeaguesPage = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Fetch league data locally
    fetch("/data/leaguesData.json") // Assuming leaguesData.json is in the public folder
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched local league data:", data);
        setLeagues(data);
      })
      .catch((error) =>
        console.error("Error fetching local league data:", error)
      );
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
