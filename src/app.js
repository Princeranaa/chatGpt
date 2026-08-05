const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors")

/* routes */
const authRoutes = require("../src/routes/auth.routes");
const chatRoutes = require("../src/routes/chats.routes");

app.use(cookieparser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"]
}))

/* Use routes */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;
