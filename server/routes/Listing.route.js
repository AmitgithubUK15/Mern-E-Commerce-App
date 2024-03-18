const express = require("express");
const { Addproduct ,UpdateClothingProduct,DeleteClothingProduct} = require("../controllers/Listing.controllers");


const router = express.Router();

router.post("/addproduct",Addproduct);
router.post("/updateProduct/:id/:sellerId",UpdateClothingProduct)
router.delete("/DeleteProduct/:id/:sellerId",DeleteClothingProduct)

module.exports = router;