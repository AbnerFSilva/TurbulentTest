import di from "./di";
import { routes } from "./route";

console.log(di.env.DATABASE_HOST);
di.app.listen(di.env.SERVER_PORT, () => {
  console.log(`server is listening! port:${di.env.SERVER_PORT}`);
});

di.app.use(routes);
module.exports = di.app;
