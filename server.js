require("dotenv").config()
const app = require("./src/app");
const initScoketServer = require("./src/sockets/socket.server");
const httpServer = require("http").createServer(app)


/* call : connect to db */
const db = require("./src/config/db")
db.connectToDb()

/* Socket called */
initScoketServer(httpServer)

httpServer.listen(3000, ()=>{
    console.log(`server started on the 3000`);
    
})