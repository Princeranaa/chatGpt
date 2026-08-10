const chatModel = require("../model/chat.model");
const messageModel = require("../model/message.model");
const { GeneratResponse, generateTitle } = require("../services/ai.service");

exports.createChat = async (req, res) => {
  try {
    const { title, chat: chatId } = req.body;
    const user = req.user;

    let chatTitle = null,
      chat = null;

    if (!chatId) {
      chatTitle = await generateTitle(title);
      chat = await chatModel.create({
        title: chatTitle,
        user: user._id,
      });
    } else {
      chat = await chatModel.findById(chatId);

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }
    }

    const userMessage = await messageModel.create({
      chat: chat._id,
      content: title,
      role: "user",
    });

    const messages = await messageModel.find({
      chat: chat._id,
    });
    // console.log("messages", messages);

    const response = await GeneratResponse(messages);

    const aiMessage = await messageModel.create({
      chat: chat._id,
      content: response,
      role: "ai",
    });

    res.status(201).json({
      chatTitle,
      message: "chat created successfully",
      chat: {
        _id: chat._id,
        title: chat.chatTitle,
        lastActivity: chat.lastActivity,
        user: chat.user,
      },
      aiMessage: {
        _id: aiMessage._id,
        chat: aiMessage.chat,
        role: aiMessage.role,
        content: aiMessage.content,
      },
    });
  } catch (error) {
    console.log("Ai error", error);
    res.status(500).json({
      message: "internal server problem",
    });
  }
};

exports.getChatsWithTitle = async (req, res) => {
  const user = req.user;
  const chat = await chatModel.find({ user: user.id });
  res.status(200).json({
    message: "Chat Retrived Successfully",
    chat,
  });
};

exports.getMessagesWithCurrentChat = async (req, res) => {
  const { chatId } = req.params;
  const user = req.user;
  const chat = await chatModel.findOne({ _id: chatId, user: user.id });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json({
    message: "Messages Retrived Successfully",
    messages,
  });
};

exports.deleteChat = async (req, res) => {
  const { chatId } = req.params;
  const user = req.user;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: user.id,
  });

  await messageModel.deleteMany({
    chat: chatId,
  });

  if (!chat) {
    return res.status(404).json({
      message: "chat not found",
    });
  }

  res.status(200).json({
    message: "Chat Deleted Successfully",
  });
};
