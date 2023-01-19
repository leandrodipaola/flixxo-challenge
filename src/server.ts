import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./components/user/user.router";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import { LoginStrategy } from "./components/auth/strategies/login.strategy";
import { JwtStrategy } from "./components/auth/strategies/jwt.strategy";
import { AuthRouter } from "./components/auth/auth.router";
import { CryptocurrencyRouter } from "./components/cryptocurrency/router/cryptocurrency.router";
import { CryptocurrencyHistoryRouter } from "./components/cryptocurrency/router/cryptocurrencyHistory.router";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.passportUse();
    this.dbConnect();
    this.app.use(morgan("dev"));
    this.app.use(express.static(__dirname + "/templates"));

    this.app.use(
      cors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
      })
    );

    this.app.use("/api", this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new AuthRouter().router,
      new CryptocurrencyRouter().router,
      new CryptocurrencyHistoryRouter().router,
    ];
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        console.log("Connect Success");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Listen in ${this.port} :: ENV = ${this.getEnvironment("ENV")}`
      );
    });
  }
}

new ServerBootstrap();
