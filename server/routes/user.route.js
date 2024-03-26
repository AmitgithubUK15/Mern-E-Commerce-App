const express = require("express");
const { testapi,
    updateuser, 
    createVendorKey ,
    updateVendor,
    AddwishListProduct,
    DeletewishListProduct
    ,GetwishListProduct,
    AddCartProduct} = require("../controllers/user.controller.js");



const router = express.Router();

router.get("/",testapi)
router.post("/update/:id", updateuser)
router.post("/vendor/:id",createVendorKey)
router.post("/vendorupdate/:id",updateVendor)
router.post("/addWishlist/:userid/:productid",AddwishListProduct)
router.post("/deleteWishlist/:userid/:productid",DeletewishListProduct)
router.get("/getWishlist/:userid",GetwishListProduct)
router.post("/addCartproduct/:userid/:productId/:ProductSize",AddCartProduct)

module.exports = router;