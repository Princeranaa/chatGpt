const express = require("express")
const app = express();
const cookieparser = require("cookie-parser")
const authRoutes = require("../src/routes/auth.routes")


app.use(cookieparser());
app.use(express.json());

/* call : connect to db */
const db = require("./config/db")
db.connectToDb()

app.use("/api/auth", authRoutes)

module.exports = app;