const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { restrictToLoggedinUserOnly } = require("./middleware/Auth.js");
const UserRouter = require("./routes/user.route.js");
const AuthRouter = require("./routes/auth.route.js");
const SellerRouter = require("./routes/seller.route.js")
const ProductListingRouter = require("./routes/Listing.route.js")
const dotenv = require("dotenv");
const path = require('path')
dotenv.config();
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({origin: process.env.CLIENT_URL,methods: ["GET", "POST","DELETE"], credentials: true}));

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(8005, () => {
    console.log("Server is started at port 8005");
});


app.use(express.json());
app.use(cookieParser()); 

app.use("/api", restrictToLoggedinUserOnly,UserRouter);
app.use("/auth", AuthRouter);
app.use("/vendor",SellerRouter);
app.use("/listing",ProductListingRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
