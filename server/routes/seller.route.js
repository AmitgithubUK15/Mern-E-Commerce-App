const express = require("express");
const { CreateSellerAccount,loginVendor,getProductList } = require("../controllers/seller.controller");
const { restrictToLoggedinUserOnly } = require("../middleware/Auth");

const router = express.Router();


router.post("/createseller",CreateSellerAccount);
router.post("/loginvendor",loginVendor)
router.get("/productList/:id",restrictToLoggedinUserOnly,getProductList)


module.exports = router;