import { DataSource } from "typeorm";
import { DotConfig } from "./util/config/Config";
import { Application } from "express";
import express = require("express");
import { AppDataSource } from "./util/config/data-source";
import axios = require("axios");
import cors = require("cors");
import session = require("express-session");

require("dotenv").config();

class DependencyInjector {
  private readonly _app: Application;
  private readonly _env: DotConfig;
  private _databaseConn: DataSource;
  private _axios = axios.default;

  constructor(env: DotConfig) {
    this._env = env;
    this._app = express();
    this._app.use(
      session({
        secret: "7D9CC16C244E32BF5E734469F6748",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 10 }, //10 minutes
      })
    );
    this._app.use(cors());
    this._app.use(express.json());
    this._databaseConn.initialize();
    this._databaseConn = AppDataSource(this._env);
  }

  get app(): Application {
    return this._app;
  }

  get env(): DotConfig {
    return this._env;
  }

  get db(): DataSource {
    return this._databaseConn;
  }

  get axios() {
    return this._axios;
  }
}

export default (() => {
  const DI = new DependencyInjector(process.env as unknown as DotConfig);
  return DI;
})();
