const express = require("express");
const { Addproduct ,
    UpdateClothingProduct,
    DeleteClothingProduct,
    getClothingProduct,
    getSingleProduct,
    GetSearchResult,
    GetExploreProduct,
    getRelatedProducts,
    GetProductViewers} = require("../controllers/Listing.controllers");
const { restrictToLoggedinUserOnly } = require("../middleware/Auth");


const router = express.Router();

router.post("/addproduct",restrictToLoggedinUserOnly,Addproduct);
router.post("/updateProduct/:id/:sellerId",restrictToLoggedinUserOnly,UpdateClothingProduct)
router.delete("/DeleteProduct/:id/:sellerId",restrictToLoggedinUserOnly,DeleteClothingProduct)
router.get("/getproduct",getClothingProduct)
router.get("/getsingleProduct/:productId",getSingleProduct);
router.get("/getRelatedProduct/:productType",getRelatedProducts);
router.get("/getsearch",GetSearchResult);
router.get("/getExplore",GetExploreProduct);
router.post("/viewProduct",GetProductViewers)


module.exports = router;