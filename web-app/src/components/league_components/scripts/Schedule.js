import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, parse, addHours } from "date-fns";
import "../styles/Schedule.css";

const Schedule = ({ schedule }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedRound, setSelectedRound] = useState("all");

  const formatDateTime = (rawDate) => {
    const parsedDate = parse(rawDate, "yyyy-MM-dd HH:mm:ss", new Date());
    const formattedDateTime = format(
      addHours(parsedDate, 7),
      "MMMM d - h:mm a"
    );
    return formattedDateTime;
  };

  const teamAbbrMapping = {
    1: "ADE",
    2: "BRI",
    3: "CBL",
    4: "COL",
    5: "ESS",
    6: "FRE",
    7: "GEE",
    8: "GCS",
    9: "GWS",
    10: "HAW",
    11: "MEL",
    12: "NM",
    13: "POR",
    14: "RIC",
    15: "STK",
    16: "SYD",
    17: "WCE",
    18: "WBD",
  };

  const allRounds = [...new Set(schedule.games.map((game) => game.roundname))];

  const handleTeamChange = (event) => {
    const selectedTeamId = event.target.value;
    setSelectedTeam(selectedTeamId === "all" ? null : selectedTeamId);
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  return (
    <div className="schedule-container">
      {/* Dropdown menu for team selection */}
      <div className="dropdown-container">
        <label htmlFor="teamSelect">Select Team: </label>
        <select id="teamSelect" onChange={handleTeamChange}>
          <option value="all">All Teams</option>
          {Object.entries(teamAbbrMapping).map(([teamId, teamAbbr]) => (
            <option key={teamId} value={teamId}>
              {teamAbbr}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown menu for round selection */}
      <div className="dropdown-container">
        <label htmlFor="roundSelect">Select Round: </label>
        <select id="roundSelect" onChange={handleRoundChange}>
          <option value="all">All Rounds</option>
          {allRounds.map((roundName) => (
            <option key={roundName} value={roundName}>
              {roundName}
            </option>
          ))}
        </select>
      </div>

      {/* Display games based on selected team and round */}
      {schedule && schedule.games && schedule.games.length > 0 ? (
        <div>
          {schedule.games
            .filter(
              (game) =>
                (selectedTeam === null ||
                  (game.hteamid &&
                    game.hteamid.toString() === selectedTeam.toString()) ||
                  (game.ateamid &&
                    game.ateamid.toString() === selectedTeam.toString())) &&
                (selectedRound === "all" || game.roundname === selectedRound)
            )

            .reduce((rounds, game) => {
              const currentRound = rounds.find(
                (round) => round[0].roundname === game.roundname
              );

              if (currentRound) {
                currentRound.push(game);
                currentRound.sort((a, b) => {
                  return (
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                  );
                });
              } else {
                rounds.push([game]);
              }

              return rounds;
            }, [])
            .map((round, index) => (
              <div key={index} className="round-container">
                <h2 className="round-heading">Round {round[0].round}</h2>
                {round.map((game, gameIndex) => (
                  <div key={gameIndex} className="game-container">
                    <div className="child team-name home">{game.hteam}</div>

                    <div className="child team-logo">
                      <img
                        src={`/logos/${game.hteamabbr}_icon.svg`}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginBottom: "-5px",
                          border: "2px solid black",
                        }}
                        alt={`${game.hteam} Logo`}
                      />
                    </div>

                    <div className="child center-block">
                      <div className="score">
                        {game.hscore} - {game.ascore}
                      </div>
                      <div
                        className={`date ${
                          game.winner !== null ? "full-time" : "normal-time"
                        }`}
                      >
                        {game.winner !== null
                          ? "FULL TIME"
                          : formatDateTime(game.date)}
                      </div>
                      <div className="venue">{game.venue}</div>
                    </div>

                    <div className="child team-logo">
                      <img
                        src={`/logos/${game.ateamabbr}_icon.svg`}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginBottom: "-5px",
                          border: "2px solid black",
                        }}
                        alt={`${game.ateam} Logo`}
                      />
                    </div>

                    <div className="child team-name away">{game.ateam}</div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        <p>No upcoming games available.</p>
      )}
    </div>
  );
};

Schedule.propTypes = {
  schedule: PropTypes.shape({
    games: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        hteam: PropTypes.string,
        ateam: PropTypes.string,
        venue: PropTypes.string,
        hscore: PropTypes.number,
        ascore: PropTypes.number,
        roundname: PropTypes.string,
        round: PropTypes.number,
        winner: PropTypes.string, // Assuming winner is a string, adjust if needed
        hteamid: PropTypes.number, // Assuming hteamid is a number, adjust if needed
        ateamid: PropTypes.number, // Assuming ateamid is a number, adjust if needed
      })
    ),
  }),
};

export default Schedule;
