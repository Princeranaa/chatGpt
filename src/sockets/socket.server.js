const { Server } = require("socket.io");

function initScoketServer(htttpServer){

    const io = new Server(htttpServer,{})

    io.on("connection", (socket)=>{
        console.log("Socket is connected", socket.id)
    })

}

module.exports = initScoketServer;