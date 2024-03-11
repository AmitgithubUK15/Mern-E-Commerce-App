const express = require("express");
const { testapi,updateuser, createVendorKey } = require("../controllers/user.controller.js");


const router = express.Router();

router.get("/",testapi)
router.post("/update/:id", updateuser)
router.post("/vendor/:id",createVendorKey)

module.exports = router;