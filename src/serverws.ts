import WebSocket = require("ws");
import { notifyUsers } from "./job/message";
let sockets: Array<any> = [];

module.exports = (server: any) => {
  const wss = new WebSocket.Server({
    server,
  });

  server.on("connection", function (socket: any) {
    console.log(`connected user: ${socket}`);
    sockets.push(socket);
    socket.on("close", function () {
      sockets = sockets.filter((s) => s !== socket);
      console.log("closed conn");
    });
  });
  notifyUsers(sockets);
  console.log("ws is listening!");
};
