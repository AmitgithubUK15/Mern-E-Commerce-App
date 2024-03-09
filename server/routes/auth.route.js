const express = require("express");
const {SignupUser,LoginUser,google,signout} = require("../controllers/auth.controller.js")

const router = express.Router();

router.post("/signup",SignupUser)
router.post("/login",LoginUser)
router.post("/google",google)
router.get("/signout",signout)

module.exports  = router;