// /api/codes.js

const axios = require('axios');
const cheerio = require('cheerio');

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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log(`📝 /api/codes endpoint hit by ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
    const codes=   await getCoinMasterCodes(); 
    res.status(200).json({ codes });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
