const express = require("express");
const { registerContoller, logincontroller } = require("../controller/auth.controller");
const router = express.Router();

router.post("/register", registerContoller)
router.post("/login", logincontroller)

module.exports = router 
