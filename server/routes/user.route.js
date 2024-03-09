const express = require("express");
const { testapi,updateuser } = require("../controllers/user.controller.js");


const router = express.Router();

router.get("/",testapi)
router.post("/update/:id", updateuser)


module.exports = router;