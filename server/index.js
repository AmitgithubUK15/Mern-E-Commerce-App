const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB)
.then(()=>{
    console.log("mongoDB connected successfully")
})
.catch((err)=>{
    console.log(err);
})

app.listen(8005,()=>{
    console.log("server is started at port 8005");
})