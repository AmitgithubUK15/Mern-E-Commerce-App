const express = require("express");
const {SignupUser,LoginUser,google} = require("../controllers/auth.controller.js")

const router = express.Router();

router.post("/signup",SignupUser)
router.post("/login",LoginUser)
router.post("/google",google)

module.exports  = router;