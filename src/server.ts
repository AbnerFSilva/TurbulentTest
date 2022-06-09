import di from "./di";
import { routes } from "./route";
const serverws = require("./serverws");

console.log(di.env.DATABASE_HOST);
const server = di.app.listen(di.env.SERVER_PORT, () => {
  console.log(`Server is listening! port:${di.env.SERVER_PORT}`);
});

di.app.use(routes);
serverws(server);

module.exports = server;
