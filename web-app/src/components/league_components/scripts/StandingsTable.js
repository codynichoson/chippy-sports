import React from "react";
import PropTypes from "prop-types";
import "../styles/StandingsTable.css";

const StandingsTable = ({ standings }) => {
  console.log("Standings data:", standings);

  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <table className="standings-table">
      <thead>
        <tr>
          <th className="rank">Pos</th>
          <th className="club" colSpan="2">
            Club
          </th>
          <th className="points">Pts</th>
          <th className="played">P</th>
          <th className="wins">W</th>
          <th className="losses">L</th>
          <th className="draws">D</th>
          <th className="for">PF</th>
          <th className="goals-against">PA</th>
          <th className="percentage">%</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team, index) => (
          <tr key={index}>
            <td>{team.rank}</td>
            <td className="logo">
              <img
                src={`/logos/${team.abbr}_icon.svg`}
                style={{
                  width: "40px",
                  height: "40px",
                  marginBottom: "-5px",
                  border: "2px solid black",
                }}
              />
            </td>
            <td className="name">{team.name}</td>
            <td className="points">{team.pts}</td>
            <td>{team.played}</td>
            <td>{team.wins}</td>
            <td>{team.losses}</td>
            <td>{team.draws}</td>
            <td>{team.for}</td>
            <td>{team.against}</td>
            <td>{team.percentage.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

StandingsTable.propTypes = {
  standings: PropTypes.array.isRequired,
};

export default StandingsTable;
