const express = require("express");
const router = express.Router();
const { registerContoller, logincontroller, verifyEmailController, getMe } = require("../controller/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middlewares");


router.post("/register", registerContoller)
router.post("/login", logincontroller)
router.get("/verified-email", verifyEmailController);
router.get("/get-me", authMiddleware, getMe)

module.exports = router 
