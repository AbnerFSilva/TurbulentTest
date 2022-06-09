import { notifyUsers } from "./job/message";
import di from "./di";
import { routes } from "./route";
const ws = require("nodejs-websocket");
let clients: Array<any> = [];

console.log(di.env.DATABASE_HOST);
const server = di.app.listen(di.env.SERVER_PORT, () => {
  console.log(`Server is listening! port:${di.env.SERVER_PORT}`);
});

di.app.use(routes);

const serverWS = ws
  .createServer(function (conn: any) {
    console.log("New connection");
    clients.push(conn);
    conn.on("close", function () {
      console.log("Connection closed");
      clients.splice(clients.indexOf(conn), 1);
    });
  })
  .listen(8082);
console.log(
  `web socket server is listening! port:${di.env.SERVER_SOCKET_PORT}`
);
notifyUsers(clients);

module.exports = server;
