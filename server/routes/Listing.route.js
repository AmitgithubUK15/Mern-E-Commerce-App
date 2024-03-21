const express = require("express");
const { Addproduct ,UpdateClothingProduct,DeleteClothingProduct,getClothingProduct} = require("../controllers/Listing.controllers");
const { restrictToLoggedinUserOnly } = require("../middleware/Auth");


const router = express.Router();

router.post("/addproduct",restrictToLoggedinUserOnly,Addproduct);
router.post("/updateProduct/:id/:sellerId",restrictToLoggedinUserOnly,UpdateClothingProduct)
router.delete("/DeleteProduct/:id/:sellerId",restrictToLoggedinUserOnly,DeleteClothingProduct)
router.get("/getproduct",getClothingProduct)

module.exports = router;