const express = require("express")
const app = express();
const cookieparser = require("cookie-parser")


/* routes */
const authRoutes = require("../src/routes/auth.routes")
const chatRoutes = require("../src/routes/chats.routes")

app.use(cookieparser());
app.use(express.json());



/* Use routes */
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)




module.exports = app;