import fetch from "node-fetch";

// Define a mapping of id to team names
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

// Function to fetch AFL standings from the Squiggle API
const getAFLStandings = async () => {
  try {
    // Make a request to the Squiggle API for AFL standings
    const standingsResponse = await fetch(
      "https://api.squiggle.com.au/?q=standings"
    );

    // Parse the JSON response
    const standingsData = await standingsResponse.json();

    // Modify the name and add abbr field based on the id
    const modifiedStandingsData = standingsData.standings.map((team) => ({
      ...team,
      name: teamNameMapping[team.id] || team.name, // Use the mapping or keep the original name
      abbr: teamAbbrMapping[team.id] || "", // Use the mapping or an empty string if abbr is not available
    }));

    return modifiedStandingsData;
  } catch (error) {
    console.error("Error fetching AFL standings:", error);
    throw new Error("Internal Server Error");
  }
};

// Function to fetch AFL schedule from the Squiggle API
const getAFLSchedule = async () => {
  try {
    // Get the current year for the schedule request
    const currentYear = new Date().getFullYear();

    // Construct the URL for the Squiggle API request
    const scheduleURL = `https://api.squiggle.com.au/?q=games;year=${currentYear}`;

    // Make a request to the Squiggle API for AFL schedule
    const scheduleResponse = await fetch(scheduleURL);

    // Parse the JSON response
    const scheduleData = await scheduleResponse.json();

    // Modify each game in the scheduleData.games array
    const modifiedGames = scheduleData.games.map((game) => {
      const hteam = teamNameMapping[game.hteamid] || game.hteam;
      const ateam = teamNameMapping[game.ateamid] || game.ateam;

      // Map the home team ID to its abbreviation (hteamabbr)
      const hteamabbr = teamAbbrMapping[game.hteamid] || "";

      // Map the away team ID to its abbreviation (ateamabbr)
      const ateamabbr = teamAbbrMapping[game.ateamid] || "";

      // Return the original game object along with hteamabbr and ateamabbr
      return {
        ...game,
        hteam,
        ateam,
        hteamabbr,
        ateamabbr,
      };
    });

    // Return the modified scheduleData with updated games array
    return {
      ...scheduleData,
      games: modifiedGames,
    };
  } catch (error) {
    console.error("Error fetching AFL schedule:", error);
    throw new Error("Internal Server Error");
  }
};

// Export the functions to be used in other modules
export { getAFLStandings, getAFLSchedule };
