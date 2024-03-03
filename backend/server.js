const express = require("express");
const cors = require("cors"); // Add this line
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3001;

// Use cors middleware
app.use(cors());

// Serve static logos from the 'public' directory
app.use("/logos", express.static(path.join(__dirname, "public", "logos")));

// Read league data from the file
const leaguesDataPath = path.join(
  __dirname,
  "public",
  "data",
  "leaguesData.json"
);
const leagues = JSON.parse(fs.readFileSync(leaguesDataPath, "utf-8"));

// Endpoint to get all leagues
app.get("/leagues", (req, res) => {
  res.json(leagues);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
