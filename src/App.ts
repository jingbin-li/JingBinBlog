import * as express from "express";
import { Application, NextFunction as NF } from "express";
import { IController } from "./interface";
import * as logger from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.middleware";
import { HTTPException } from "./middleware/middlewareModel/HTTPException";
import * as mongoose from "mongoose";
import { DATABASE_CONFIG } from "./configs/dbconfig";
import * as log4js from "log4js";
import * as cors from "cors";
export class App {
  //端口 + web服务器实例
  private app: Application;
  private conectUrl: string;
  constructor(private port: number, controllers: IController[]) {
    this.conentcMongoDB();
    this.port = port;
    this.app = express();
    this.initializeMiddleware(controllers);
    this.startListen();
  }

  //初始化中间件
  private initializeMiddleware(controllers: IController[]) {
    //this.app.use(cors()); 
    //可以用json处理post请求体
    this.app.use(express.json());
    this.app.use(logger("dev"));
    this.initializeControllers(controllers);
    this.app.use(errorMiddleware.NotMatchedRoute);
    this.app.use(errorMiddleware.errorMiddleware);
  }

  //初始化路由
  private initializeControllers(controllers: IController[]) {
    controllers.forEach((item) => {
      this.app.use("/api/v1", item.router);
    });
  }
  //连接数据库
  private conentcMongoDB() {
    const {
      DATABASE_HOST: host,
      DATABASE_PORT: port,
      DATABASE_NAME: database,
      DATABASE_USERNAME: username,
      DATABASE_PASSWORD: password,
    } = process.env;
    const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("数据库已连接");
    });
  }

  //监听接口
  private startListen() {
    const port = this.port;
    this.app.listen(port, () => {
      console.log(`正在监听${port}端口`);
    });
  }
}
