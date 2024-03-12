const express = require("express");
const { Addproduct } = require("../controllers/Listing.controllers");


const router = express.Router();

router.post("/addproduct",Addproduct);

module.exports = router;