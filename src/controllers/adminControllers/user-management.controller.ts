import { AController } from "../../abstract/AController.controller";
import { IController } from "../../interface/IController.interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import { Users, Roles } from "../../models";
import * as httpContext from "express-http-context";
import { ApiResult, IUsersList } from "../../interface";
import { HTTPException } from "../../middleware/middlewareModel/HTTPException";
import { configure } from "log4js";
export class UserManagementController
  extends AController
  implements IController {
  protected basePath = "/admin";
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.attachToRoutes();
  }
  protected attachToRoutes(): void {
    const path = this.basePath;
    this.router.post(`${path}/createUser`, this.createUser);
    this.router.get(`${path}/userlist`, this.getList);
    this.router.get(`${path}/checkName`, this.checkName);
    this.router.delete(`${path}/removeUser`, this.removeUser);
    this.router.post(`${path}/updateUser`, this.updateUser);
  }
  private async createUser(req: Request, res: Response, next: NF) {
    try {
      const currentUser = httpContext.get("user").userName;
      const { role, email, userName, passWord } = req.body;
      const user = new Users({ email, userName, passWord });
      const userResult = await user.save();
      const erro = new HTTPException(500, "fail", "添加失败");
      if (userResult) {
        const userRole = new Roles({
          role,
          userId: userResult._id,
          creater: currentUser,
        });
        const userRoleResult = await userRole.save();
        if (userRoleResult) {
          const result: ApiResult = { data: {}, code: 200 };
          res.json(result);
        } else {
          await Users.remove(userResult._id);
          next(erro);
        }
      } else {
        next(erro);
      }
    } catch (error) {
      const err = new HTTPException(500, "fail", error);
      next(err);
    }
  }
  private async updateUser(req: Request, res: Response, next: NF) {
    try {
      const { user_id, role_id, userName, email, role, passWord } = req.body;
      let user;
      const userRole = { role };
      if (passWord) {
        user = { userName, email, passWord };
      } else {
        user = { userName, email };
      }

      const userResult = await Users.update({ _id: user_id }, user);
      const roleReuslt = await Roles.update({ _id: role_id }, userRole);
      const result: ApiResult = { data: "success", code: 200 };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "fail", error);
      next(err);
    }
  }
  private async getList(req: Request, res: Response, next: NF) {
    try {
      const { name } = req.query;
      const reg = new RegExp(name.toString(), "i");
      const x: any = [
        {
          $lookup: {
            from: "roles",
            localField: "_id",
            foreignField: "userId",
            as: "role",
          },
        },
      ];
      if (name) {
        const y = {
          $match: {
            userName: { $regex: reg },
          },
        };
        x.push(y);
      }
      const query = await Users.aggregate(x);
      const userList = query.map((item) => {
        const role = item.role[0];
        const user: IUsersList = {
          user_id: item._id,
          role_id: role._id,
          userName: item.userName,
          role: role.role,
          email: item.email,
          creater: role.creater,
          createTime: role.createTime,
        };
        return user;
      });
      const result: ApiResult = { data: userList, code: 200 };
      res.json(result);
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      res.json(result);
      next(error);
    }
  }

  private async checkName(req: Request, res: Response, next: NF) {
    let result: ApiResult;
    const { userName } = req.query;
    const name = userName.toString();
    try {
      if (name) {
        const isExist = await Users.findOne({ userName: name }, "_id");
        if (isExist) {
          result = { data: { isExist: true }, code: 200 };
        } else {
          result = { data: { isExist: false }, code: 200 };
        }
      } else {
        result = { data: "", code: 500 };
      }
    } catch (error) {
      const err = new HTTPException(500, "内部错误", error);
      next(err);
    }

    res.json(result);
  }

  private async removeUser(req: Request, res: Response, next: NF) {
    let result: ApiResult;
    try {
      const { user_id, role_id } = req.query;
      const userResult = await Users.remove({ _id: user_id });
      const roleReuslt = await Roles.remove({ _id: role_id });
      result = { data: "success", code: 200 };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "fail");
      next(err);
    }
  }
}
