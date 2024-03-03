import React, { useState, useEffect } from "react";
import "./NRLPage.css";

const NRLPage = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    // Simulate fetching NRL standings data
    // Replace this with actual API call or data source
    const fetchStandings = async () => {
      try {
        // Simulated standings data
        const simulatedData = [
          { id: 1, teamName: "Team A", wins: 10, losses: 5, ties: 2 },
          { id: 2, teamName: "Team B", wins: 8, losses: 7, ties: 1 },
          { id: 3, teamName: "Team C", wins: 12, losses: 3, ties: 0 },
          // ... Include other teams
        ];

        setStandings(simulatedData);
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
            <th>Team Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th>Winning Percentage</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.ties}</td>
              <td>
                {(
                  ((team.wins + team.ties) /
                    (team.wins + team.losses + team.ties)) *
                  100
                ).toFixed(2)}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NRLPage;
