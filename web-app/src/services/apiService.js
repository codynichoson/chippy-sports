import fetch from "node-fetch";

const teamNameMapping = {
  1: "Adelaide Crows",
  2: "Brisbane Lions",
  3: "Carlton",
  4: "Collingwood",
  5: "Essendon",
  6: "Fremantle",
  7: "Geelong Cats",
  8: "Gold Coast Suns",
  9: "GWS Giants",
  10: "Hawthorn",
  11: "Melbourne",
  12: "North Melbourne",
  13: "Port Adelaide",
  14: "Richmond",
  15: "St Kilda",
  16: "Sydney Swans",
  17: "West Coast Eagles",
  18: "Western Bulldogs",
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

const getAFLStandings = async () => {
  try {
    const standingsResponse = await fetch(
      "https://api.squiggle.com.au/?q=standings"
    );
    const standingsData = await standingsResponse.json();

    const modifiedStandingsData = standingsData.standings.map((team) => ({
      ...team,
      name: teamNameMapping[team.id] || team.name,
      abbr: teamAbbrMapping[team.id] || "",
    }));

    return modifiedStandingsData;
  } catch (error) {
    console.error("Error fetching AFL standings:", error);
    throw new Error("Internal Server Error");
  }
};

const getAFLSchedule = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const scheduleURL = `https://api.squiggle.com.au/?q=games;year=${currentYear}`;
    const scheduleResponse = await fetch(scheduleURL);
    const scheduleData = await scheduleResponse.json();

    const modifiedGames = scheduleData.games.map((game) => {
      const hteam = teamNameMapping[game.hteamid] || game.hteam;
      const ateam = teamNameMapping[game.ateamid] || game.ateam;
      const hteamabbr = teamAbbrMapping[game.hteamid] || "";
      const ateamabbr = teamAbbrMapping[game.ateamid] || "";

      return {
        ...game,
        hteam,
        ateam,
        hteamabbr,
        ateamabbr,
      };
    });

    return {
      ...scheduleData,
      games: modifiedGames,
    };
  } catch (error) {
    console.error("Error fetching AFL schedule:", error);
    throw new Error("Internal Server Error");
  }
};

export { getAFLStandings, getAFLSchedule };
