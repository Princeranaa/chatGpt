const chatModel = require("../model/chat.model");
const messageModel = require("../model/message.model");
const { GeneratResponse, generateTitle } = require("../services/ai.service");

exports.createChat = async (req, res) => {
  try {
    const { title, chat: chatId } = req.body;
    const user = req.user;

    // const response = await GeneratResponse(title);

    let chatTitle = null,
      chat = null;

    if (!chatId) {
      chatTitle = await generateTitle(title);
      chat = await chatModel.create({
        //   title,
        chatTitle,
        user: user._id,
      });
    } 
    

    const messages = await messageModel.find({
    //   chat: chat._id,
        chat: chatId || chat._id,
    });

    console.log("messages",messages)


     
    

    // const userMessage = await messageModel.create({
    //   chat: chat._id,
    //   content: title,
    //   role: "user",
    // });

    // const aiMessage = await messageModel.create({
    //   chat: chat._id,
    //   content: response,
    //   role: "ai",
    // });

    // res.status(201).json({
    //   chatTitle,
    //   message: "chat created successfully",
    //   chat: {
    //     _id: chat._id,
    //     title: chat.chatTitle,
    //     lastActivity: chat.lastActivity,
    //     user: chat.user,
    //   },

    //   aiMessage: {
    //     _id: aiMessage._id,
    //     chat: aiMessage.chat,
    //     role: aiMessage.role,
    //     content: aiMessage.content,
    //   },
    // });
  } catch (error) {
    console.log("Ai error", error);
    res.status(500).json({
      message: "internal server problem",
    });
  }
};
