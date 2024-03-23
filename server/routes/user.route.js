const express = require("express");
const { testapi,updateuser, createVendorKey ,updateVendor,AddwishListProduct} = require("../controllers/user.controller.js");



const router = express.Router();

router.get("/",testapi)
router.post("/update/:id", updateuser)
router.post("/vendor/:id",createVendorKey)
router.post("/vendorupdate/:id",updateVendor)
router.post("/addWishlist/:userid/:productid",AddwishListProduct)

module.exports = router;