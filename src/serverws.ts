import { notifyUsers } from "./job/message";
import WebSocket = require("ws");
let clients: Array<any> = [];

module.exports = (server: any) => {
  new WebSocket.Server({
    server,
  });

  server.on("connection", function connection(ws: WebSocket) {
    console.log(`connected user`);
    ws.emit("hello");
    clients.push(ws);
    ws.on("close", function () {
      clients = clients.filter((s) => s !== ws);
      console.log("closed conn");
    });
  });

  notifyUsers(clients);
  console.log("ws is listening!");
};
