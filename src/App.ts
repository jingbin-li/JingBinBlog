import * as express from "express";
import { Application,NextFunction as NF } from "express";
import { IController } from "./interface";
import * as logger from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.middleware";
import { HTTPException } from "./middleware/middlewareModel/HTTPException";
export class App {
  //端口 + web服务器实例
  private app: Application;
  constructor(private port: number, controllers: IController[]) {
    this.port = port;
    this.app = express();
    this.initializeMiddleware(controllers);
    this.startListen();
  }

  //初始化中间件
  private initializeMiddleware(controllers: IController[]) {
    //可以用json处理post请求体
    this.app.use(express.json());
    this.app.use(logger("dev"));
    this.initializeControllers(controllers);
    this.app.use(errorMiddleware.NotMatchedRoute);
    this.app.use(errorMiddleware.errorMiddleware);
  }

  //
  private initializeControllers(controllers: IController[]) {
    controllers.forEach((item) => {
      this.app.use("/api/v1", item.router);
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
