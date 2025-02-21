const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require("cors")
const userRoute = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const gameVideosRoutes = require("./routes/gameVideos.routes");
const gameReviewRoutes = require("./routes/gameReview.routes");


const app = express()


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


app.listen(process.env.PORT,()=>{
    console.log(`Successfully connected and app is running at port ${process.env.PORT}`)
})