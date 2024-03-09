import React, { useState, useEffect } from "react";
import StandingsTable from "../../../components/league_components/scripts/StandingsTable";
import Schedule from "../../../components/league_components/scripts/Schedule";
import LeagueMenuBar from "../../../components/league_components/scripts/LeagueMenuBar";
import { Outlet, Route, Routes } from "react-router-dom";

import "../styles/AFLPage.css";

const AFLPage = () => {
  const [standings, setStandings] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch standings from the local API server
        const standingsResponse = await fetch(
          "http://localhost:3001/api/standings"
        );
        const standingsData = await standingsResponse.json();
        setStandings(standingsData);

        // Fetch schedule from the local API server
        const scheduleResponse = await fetch(
          "http://localhost:3001/api/schedule"
        );
        const scheduleData = await scheduleResponse.json();
        setSchedule(scheduleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="afl-page-container">
      <h2 className="afl-page-title">Australian Football League</h2>
      <LeagueMenuBar />
      <Outlet />
      <Routes>
        <Route
          path="/standings"
          element={<StandingsTable standings={standings} />}
        />
        <Route path="/schedule" element={<Schedule schedule={schedule} />} />
      </Routes>
    </div>
  );
};

export default AFLPage;
