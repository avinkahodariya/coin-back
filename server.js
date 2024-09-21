// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

let codes = [];
// Schedule a task to fetch the codes daily (you can change the frequency)
cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
  console.log('Fetching daily Coin Master codes...');
  codes = await getCoinMasterCodes(); // Update the codes
});

// Endpoint to serve the codes
app.get('/api/codes', async(req, res) => {
    const codes = await getCoinMasterCodes()
    console.log("🚀 ~ file: server.js:43 ~ app.get ~ codes:", codes)
  res.json({ codes });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
