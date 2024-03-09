// server.mjs

import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { promises as fs } from "fs";
import path from "path";
import * as aflService from "./services/aflService.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

// Use cors middleware
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve static logos
app.use("/logos", express.static(path.join(__dirname, "public", "logos")));

// Read league data from the file
const leaguesDataPath = path.join(
  __dirname,
  "public",
  "data",
  "leaguesData.json"
);
const leagues = JSON.parse(await fs.readFile(leaguesDataPath, "utf-8"));

// Endpoint to get all leagues
app.get("/leagues", (req, res) => {
  res.json(leagues);
});

// ======================== AFL API Calls ========================
// Endpoint to get AFL standings from Squiggle API
app.get("/api/standings", async (req, res) => {
  try {
    const standingsData = await aflService.getAFLStandings();
    res.json(standingsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get AFL schedule from Squiggle API
app.get("/api/schedule", async (req, res) => {
  try {
    const scheduleData = await aflService.getAFLSchedule();
    res.json(scheduleData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
