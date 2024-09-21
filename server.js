// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

let codes = [];

// Example scraping function (you should modify it to work with the real data source)
async function getCoinMasterCodes() {
  try {
    const { data } = await axios.get('https://www.theroaringman.com/claim-your-free-spins-in-coin-master/#google_vignette'); // Official Facebook page
    const $ = cheerio.load(data);

    // This is a placeholder. You must modify it to extract actual spin links from the page.
    $('a').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && href.includes('coinmaster')) {
        console.log("🚀 ~ file: server.js:23 ~ $ ~ href:", href)
        codes.push(href); // You should refine the filter based on actual links structure
      }
    });

    return codes;
  } catch (error) {
    console.error('Error fetching codes:', error);
    return [];
  }
}

// Schedule a task to fetch the codes daily (you can change the frequency)
cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
  console.log('Fetching daily Coin Master codes...');
  codes = await getCoinMasterCodes(); // Update the codes
});

// Endpoint to serve the codes
app.get('/codes', async(req, res) => {
    const codes = await getCoinMasterCodes()
    console.log("🚀 ~ file: server.js:43 ~ app.get ~ codes:", codes)
  res.json({ codes });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
