import { IController, ApiResult } from "../../interface";
import { Router, Requset, Response, NextFunction as NF } from "express";
import { AController } from "../../abstract/AController.controller";
import { Users } from "../../models";
import { promises } from "fs";
import { VerificationJTW } from "../../tools";
import GenerateJwt from "../../tools/generate-jwt";
import * as jsonwebtoken from "jsonwebtoken";
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
    this.router.post(`${path}/verification`, this.addUser);
  }
  //处理逻辑的方法
  private getUser(req: Requset, res: Response, next: NF) {
    res.send("okok");
  }
  private async addUser(req: Requset, res: Response, next: NF) {
    let { userName, passWord, avatar, email } = req.body;
    //let user = new User({ userName, passWord, avatar, email });
    //  await user.save();
    const reuslt = await Users.find(
      { userName: userName, passWord: passWord },
      "_id"
    );
    if (reuslt.length === 0) {
      res.json({ data: "fail", code: 500 });
    } else {
      const jwt = GenerateJwt(userName);
      let result: ApiResult = { data: { token: jwt }, code: 200 };
      res.json(result);
    }
  }
}
