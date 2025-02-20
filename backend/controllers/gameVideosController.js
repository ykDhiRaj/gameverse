const fetch = require("node-fetch");

const getGameVideos = async (req, res) => {
  try {
    const apiUrl = `https://www.gamespot.com/api/videos/?api_key=${process.env.GAMESPOT_API_KEY}&format=json&sort=publish_date:desc`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.json(data.results); // Send only the results array
  } catch (error) {
    console.error("Error fetching game videos:", error.message);
    res.status(500).json({ error: "Failed to fetch game videos" });
  }
};

module.exports = { getGameVideos };
