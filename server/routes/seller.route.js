const express = require("express");
const { CreateSellerAccount,loginVendor } = require("../controllers/seller.controller");

const router = express.Router();


router.post("/createseller",CreateSellerAccount);
router.post("/loginvendor",loginVendor)


module.exports = router;