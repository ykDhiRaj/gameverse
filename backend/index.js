const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require("cors")
const userRoute = require('./routes/user.route');
const authRoutes = require('./routes/authRoutes');

const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use("/user",userRoute);

app.use("/api/auth", authRoutes);


mongoose.connect(process.env.URI).
then(()=>{
    console.log("Mongo DB connected")
}).catch((error)=>{
    console.log(error)
})


app.listen(process.env.PORT,()=>{
    console.log(`Successfully connected and app is running at port ${process.env.PORT}`)
})