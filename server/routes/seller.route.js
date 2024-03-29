const express = require("express");
const { CreateSellerAccount,loginVendor,getProductList ,ProductDelete} = require("../controllers/seller.controller");
const { restrictToLoggedinUserOnly } = require("../middleware/Auth");

const router = express.Router();


router.post("/createseller",CreateSellerAccount);
router.post("/loginvendor",loginVendor)
router.get("/productList/:id",restrictToLoggedinUserOnly,getProductList)
router.post("/productdelete/:prodcutId/:sellerId",restrictToLoggedinUserOnly,ProductDelete);

module.exports = router;