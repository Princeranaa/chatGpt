const chatModel = require("../model/chat.model")

exports.createChat = async (req, res) => {
    try {
        const { title } = req.body;
        const user = req.user;

        const chat = await chatModel.create({
            title,
            user: user._id
        });

        res.status(200).json({
            message: "chat created successfully",
            chat: {
                _id: chat._id,
                title: chat.title,
                lastActivity: chat.lastActivity,
                user: chat.user
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server problem"
        })
    }



}