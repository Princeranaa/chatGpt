const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken")
const userModel = require("../model/User.model")
const { generateResponse } = require("../services/ai.service")
const messageModel = require("../model/message.model")

function initScoketServer(htttpServer) {

    const io = new Server(htttpServer, {})

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if (!cookies.token) {
            next(new Error("Authentication error: no token provided"))
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.SECRECT_KEY)
            const user = await userModel.findById(decoded.id)
            socket.user = user
            next()

        } catch (error) {
            next(new Error("Authentication error: invalid token"))
        }
    })


    io.on("connection", (socket) => {
        console.log("User connected", socket.user);
        console.log("Socket is connected", socket.id);

        socket.on("ai-message", async (messagePayload) => {
            console.log("message received===>", messagePayload)
            
            const userMessage =  new messageModel({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: messagePayload.content,
                role: "user"
            });
            await userMessage.save();


            const response = await generateResponse(messagePayload.content)

            const aiMessageResponse =  new messageModel({
                user: socket.user._id,
                chat:messagePayload.chat,
                content: response,
                role: "model"
            });
            await aiMessageResponse.save()


            console.log("response???", response)
            socket.emit("ai-response", { content: response, chat: messagePayload.chat })
        });








    })

}

module.exports = initScoketServer;