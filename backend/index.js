const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require("cors")
const userRoute = require('./routes/user.route');
const authRoutes = require('./routes/authRoutes');

const gameVideosRoutes = require("./routes/gameVideosRoutes");
const gameReviewRoutes = require("./routes/gameReviewRoutes");


const app = express()

const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/user",userRoute);

app.use("/api/auth", authRoutes);

app.use("/api/game-videos", gameVideosRoutes);

app.use("/api/game-reviews", gameReviewRoutes);



mongoose.connect(process.env.URI).
then(()=>{
    console.log("Mongo DB connected")
}).catch((error)=>{
    console.log(error)
})


app.listen(PORT,()=>{
    console.log(`Successfully connected and app is running at port ${PORT}`)
})