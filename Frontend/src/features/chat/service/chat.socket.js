import { io } from "socket.io-client";

export const initializeSocket = () => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("connected to server", socket.id);
  });

  //   socket.on("disconnect", () => {
  //     console.log("disconnected from server");
  //   });

  //   return socket;
};
