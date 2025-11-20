const express = require("express");
const { registerContoller } = require("../controller/auth.controller");
const router = express.Router();

router.post("/register", registerContoller)

module.exports = router 
