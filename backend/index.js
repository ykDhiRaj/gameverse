const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require("cors")
const userRoute = require('./routes/user.route');
const authRoutes = require('./routes/authRoutes');

const gameVideosRoutes = require("./routes/gameVideosRoutes");


const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/api/game-reviews", async (req, res) => {
    try {
      const apiUrl = `https://www.gamespot.com/api/reviews/?api_key=${process.env.GAMESPOT_API_KEY}&format=json&sort=publish_date:desc`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      res.json(data.results); // Send only reviews array
    } catch (error) {
      console.error("Error fetching API:", error.message);
      res.status(500).json({ error: "Failed to fetch game reviews" });
    }
  });

app.use("/user",userRoute);

app.use("/api/auth", authRoutes);

app.use("/api/game-videos", gameVideosRoutes);



mongoose.connect(process.env.URI).
then(()=>{
    console.log("Mongo DB connected")
}).catch((error)=>{
    console.log(error)
})


app.listen(process.env.PORT,()=>{
    console.log(`Successfully connected and app is running at port ${process.env.PORT}`)
})