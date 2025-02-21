const fetch = require("node-fetch");

const getGameReviews = async (req, res) => {
  try {
    const apiUrl = `https://www.gamespot.com/api/reviews/?api_key=${process.env.GAMESPOT_API_KEY}&format=json&sort=publish_date:desc`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.json(data.results); // Send only the reviews array
  } catch (error) {
    console.error("Error fetching game reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch game reviews" });
  }
};

module.exports = { getGameReviews };
