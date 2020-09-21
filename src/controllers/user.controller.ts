import { IController } from "../interface";
import { Router, Requset, Response, NextFunction as NF } from "express";
import { AController } from "../abstract/AController.controller";
export class UserController extends AController implements IController {
  protected basePath: string;
  public router: Router;
  constructor() {
    super();
    this.basePath = "/User";
    this.router = Router();
    this.attachToRoutes();
  }
  //生成route 将route 暴露给app 使route在 app中注册 类似 app.get(....)
  private attachToRoutes() {
    const path = this.basePath;
    console.log(path);
    this.router.get(path, this.getUser);
    this.router.get(`${path}1`,this.addUser)
  }
  //处理逻辑的方法
  private getUser(req: Requset, res: Response, next: NF) {
    res.send("okok");
  }
  private addUser(req: Requset, res: Response, next: NF){
    res.send('okokokokokokok')
  }
}
