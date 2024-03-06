const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const UserRouter = require("./routes/user.route.js");
const AuthRouter = require("./routes/auth.route.js")
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



app.use(cors())
app.use(express.json())

app.use("/api",UserRouter);
app.use("/api/auth",AuthRouter);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message= err.message || "Internal server error";
    return res.status(statusCode).json({
      success:false,
      statusCode,
      message,
    });
  });