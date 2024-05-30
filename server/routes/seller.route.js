const express = require("express");
const { CreateSellerAccount,loginVendor,getProductList ,ProductDelete,
    GetTotalVisitor,GetTotalOrders,GetVisitorsByProduct} = require("../controllers/seller.controller");
const { restrictToLoggedinUserOnly } = require("../middleware/Auth");

const router = express.Router();


router.post("/createseller",CreateSellerAccount);
router.post("/loginvendor",loginVendor)
router.get("/productList/:id",restrictToLoggedinUserOnly,getProductList)
router.post("/productdelete/:prodcutId/:sellerId",restrictToLoggedinUserOnly,ProductDelete);
router.get("/getTotalVistor/:sellerId",restrictToLoggedinUserOnly,GetTotalVisitor);
router.get("/getTotalOrder/:sellerId",restrictToLoggedinUserOnly,GetTotalOrders);
router.get("/getVisitorsByProducts/:sellerId",restrictToLoggedinUserOnly,GetVisitorsByProduct);


module.exports = router;