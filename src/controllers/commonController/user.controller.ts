import { IController, ApiResult } from "../../interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import { AController } from "../../abstract/AController.controller";
import { Roles, Users } from "../../models";
import { promises } from "fs";
import VerificationJwt from "../../tools/verification-jwt";
import GenerateJwt from "../../tools/generate-jwt";
import * as jsonwebtoken from "jsonwebtoken";
import * as httpContext from "express-http-context";
import { HTTPException } from "../../middleware/middlewareModel/HTTPException";
export class UserController extends AController implements IController {
  protected basePath = "/user";
  public router: Router;
  constructor() {
    super();
    this.router = Router();
    this.attachToRoutes();
  }
  //生成route 将route 暴露给app 使route在 app中注册 类似 app.get(....)
  protected attachToRoutes() {
    const path = this.basePath;
    this.router.get(`${path}/currentUser`, this.getCurrentUser);
    this.router.post(`${path}/verification`, this.verificationUser);
  }
  //处理逻辑的方法
  private getCurrentUser(req: Request, res: Response, next: NF) {
    const currentUser = httpContext.get("user");
    const isExist = Users.findOne({ userName: currentUser.userName }, "_id");
    const role = currentUser.role;
    if (isExist) {
      const reuslt: ApiResult = {
        data: { userName: currentUser, role },
        code: 200,
      };
      res.json(reuslt);
    } else {
      res.json({ data: "fail", code: 500 });
    }
  }
  //验证用户是否合法并且颁发token
  private async verificationUser(req: Request, res: Response, next: NF) {
    let { userName, passWord, avatar, email } = req.body;
    try {
      const reuslt = await Users.findOne({ userName, passWord }, "_id");
      const role = await Roles.findOne({ userId: reuslt._id }, "role -_id");
      if (reuslt) {
        const jwt = await GenerateJwt(userName);
        let result: ApiResult = { data: { jwt, role }, code: 200 };
        res.json(result);
      } else {
        res.json({ data: "fail", code: 500 });
      }
    } catch (error) {
      const err = new HTTPException(500, "fail", error);
      next(err);
    }
  }
}
