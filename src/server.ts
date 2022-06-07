import di from "./di";
import { routes } from "./route";

console.log(di.env.DATABASE_HOST);
di.app.listen(di.env.SERVER_PORT, async () => {
  console.log("server is listening!");
});

di.app.use(routes);
