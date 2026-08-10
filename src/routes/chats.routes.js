const exprees = require("express");
const router = exprees.Router();
const {authMiddleware} = require("../middlewares/auth.middlewares");
const { createChat, getMessagesWithCurrentChat, getChatsWithTitle,deleteChat } = require("../controller/chat.controller");


router.post("/", authMiddleware, createChat); 
router.get("/", authMiddleware, getChatsWithTitle); 
router.get("/:chatId/messages", authMiddleware, getMessagesWithCurrentChat); 
router.delete("/delete/:chatId", authMiddleware, deleteChat)


module.exports = router;