const express = require("express");
const { testapi,updateuser,createVendor } = require("../controllers/user.controller.js");


const router = express.Router();

router.get("/",testapi)
router.post("/update/:id", updateuser)
router.post("/vendor/:id",createVendor)

module.exports = router;