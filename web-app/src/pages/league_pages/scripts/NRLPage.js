import React, { useState, useEffect } from "react";
import "../styles/NRLPage.css";

const NRLPage = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const url =
        "https://rugbyapi2.p.rapidapi.com/api/rugby/tournament/294/season/39630/standings/total";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "faef26d4c8msh413d0eeacead4cbp1a452ajsnffbad48f956c",
          "X-RapidAPI-Host": "rugbyapi2.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Fetched NRL standings data:", data);
        setStandings(data?.standings?.[0]?.rows || []);
      } catch (error) {
        console.error("Error fetching NRL standings data:", error);
      }
    };

    fetchStandings();
  }, []);

  return (
    <div className="nrl-page-container">
      <h2 className="nrl-name">National Rugby League</h2>
      <table className="standings-table">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Team Name</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.id}>
              <td>{team.position}</td>
              <td>{team.team.name}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NRLPage;
