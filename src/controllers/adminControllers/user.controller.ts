import { IController } from "../../interface";
import { Router, Requset, Response, NextFunction as NF } from "express";
import { AController } from "../../abstract/AController.controller";
import { User } from "../../models";
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
  protected attachToRoutes() {
    const path = this.basePath;
    this.router.get(path, this.getUser);
    this.router.post(`${path}/create`, this.addUser);
  }
  //处理逻辑的方法
  private getUser(req: Requset, res: Response, next: NF) {
    res.send("okok");
  }
  private async addUser(req: Requset, res: Response, next: NF) {
    let { userName, passWord, avatar, email } = req.body;
    let user = new User({ userName, passWord, avatar, email });
    await user.save();
    res.json({
      success: true,
      data: user,
    });
  }
}
