import * as express from "express";
import { Application, NextFunction as NF, Request } from "express";
import { IController } from "./interface";
import * as logger from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.middleware";
import { HTTPException } from "./middleware/middlewareModel/HTTPException";
import * as mongoose from "mongoose";
import * as log4js from "log4js";
import VerificationJwt from "./tools/verification-jwt";
import * as httpContext from "express-http-context";
import * as path from "path";
import * as fs from "fs";
import * as history from "connect-history-api-fallback";
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
    // this.app.all("*", function (req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*"); //当允许携带cookies此处的白名单不能写’*’
    //   res.header(
    //     "Access-Control-Allow-Headers",
    //     "content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With"
    //   ); //允许的请求头
    //   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT"); //允许的请求方法
    //   next();
    // });
    //可以用json处理post请求体
    // 访问静态资源
    //访问单页
    this.app.use(express.static(path.resolve(__dirname, "../blog/dist")));
    this.app.get("/", (req, res, next: NF) => {
      const html = fs.readFileSync(
        path.resolve(__dirname, "../blog/dist/index.html"),
        "utf-8"
      );
      res.send(html);
      next();
    });
    this.app.use(history({ exclusions: ["/api/v1/*"] }));
    this.app.use(
      express.static(path.resolve(__dirname, "../adminBlog/dist/client"))
    );
    this.app.get("/admin/login", (req, res, next: NF) => {
      const html = fs.readFileSync(
        path.resolve(__dirname, "../adminBlog/dist/client/index.html"),
        "utf-8"
      );
      res.send(html);
      next();
    });
    this.app.use(express.json());
    this.app.use(logger("dev"));
    this.app.use(express.static("public"));
    this.app.use(httpContext.middleware);
    this.app.use(VerificationJwt);
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
