const express = require("express");
const { CreateSellerAccount } = require("../controllers/seller.controller");

const router = express.Router();


router.post("/createseller",CreateSellerAccount);


module.exports = router;