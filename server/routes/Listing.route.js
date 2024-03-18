const express = require("express");
const { Addproduct ,UpdateClothingProduct} = require("../controllers/Listing.controllers");


const router = express.Router();

router.post("/addproduct",Addproduct);
router.post("/updateProduct/:id/:sellerId",UpdateClothingProduct)

module.exports = router;