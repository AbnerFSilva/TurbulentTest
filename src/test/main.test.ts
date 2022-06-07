import { config } from "dotenv";
import di from "../di";

config();

before((done) => {});

after((done) => {
  done();
});
