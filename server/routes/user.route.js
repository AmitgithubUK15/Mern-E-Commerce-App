const express = require("express");
const { testapi } = require("../controllers/user.controller.js")

const router = express.Router();

router.get("/",testapi)

module.exports = router;