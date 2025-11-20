const exprees = require("express");
const router = exprees.Router();
const {authMiddleware} = require("../middlewares/auth.middlewares");
const { createChat } = require("../controller/chat.controller");


router.post("/", authMiddleware, createChat);


module.exports = router;