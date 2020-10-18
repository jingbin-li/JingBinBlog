import { AController } from "../../abstract/AController.controller";
import { IController } from "../../interface/IController.interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import { Users, Roles, ImagePath, ArticleCategory } from "../../models";
import * as httpContext from "express-http-context";
import { ApiResult, IUsersList } from "../../interface";
import { HTTPException } from "../../middleware/middlewareModel/HTTPException";
import { configure } from "log4js";
import * as fs from "fs";
import * as multiparty from "multiparty";
import * as moment from "moment";
import { Articles } from "../../models/Articles.schema";
import * as mongoose from "mongoose";
export class ArticlesManagementController
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
    this.router.post(`${path}/images`, this.uploadImage);

    this.router.post(`${path}/articlesType`, this.createArticlesType);
    this.router.get(`${path}/articlesTypeList`, this.getArticlesTypeList);
    this.router.post(`${path}/updateArticlesType`, this.updateArticlesType);
    this.router.delete(`${path}/removeArticlesType`, this.removeArticlesType);

    this.router.get(`${path}/articlesList`, this.getList);
    this.router.delete(`${path}/removeArticles`, this.removeArticles);
    this.router.post(`${path}/updateArticles`, this.updateArticles);

    this.router.get(`${path}/menuList`, this.getMenuList);
    this.router.post(`${path}/articles`, this.createArticles);
  }
  private async uploadImage(req: Request, res: Response, next: NF) {
    try {
      var form = new multiparty.Form({ uploadDir: "./public/images" });
      form.parse(req, function (err, fields, files) {
        const file = files.file[0];
        const newFileName = `${moment().format("YYYY-MM-DD")}${
          file.originalFilename
        }`;
        const newPath = `public\\images\\${newFileName}`;
        fs.renameSync(file.path, newPath);
        file.path = newPath;
        if (err) {
          const error = new HTTPException(500, "fail", err);
          next(error);
        } else {
          res.json({ location: `images\\${newFileName}` });
        }
      });
    } catch (error) {
      const err = new HTTPException(500, "fail", error);
      next(err);
    }
  }

  private async createArticlesType(req: Request, res: Response, next: NF) {
    const { articleType, menuType } = req.body;
    const currentUser = httpContext.get("user");
    try {
      const articleCategory = new ArticleCategory({
        articleType,
        menuType,
        creater: currentUser.userName,
      });
      const articleCategoryRes = await articleCategory.save();
      const result: ApiResult = { data: articleCategoryRes, code: 200 };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "内部错误", error);
      next(err);
    }
  }
  private async getArticlesTypeList(req: Request, res: Response, next: NF) {
    try {
      const articleCategoryList = await ArticleCategory.find();
      const result: ApiResult = { data: articleCategoryList, code: 200 };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "内部错误", error);
      next(err);
    }
  }
  private async updateArticlesType(req: Request, res: Response, next: NF) {
    try {
      const { _id, articleType, menuType } = req.body;
      await ArticleCategory.update(
        { _id },
        {
          articleType,
          menuType,
        }
      );
      const result: ApiResult = { data: "", code: 200 };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "内部错误", error);
      next(err);
    }
  }
  private async removeArticlesType(req: Request, res: Response, next: NF) {
    try {
      const { _id } = req.query;
      await ArticleCategory.remove({ _id });
      const result: ApiResult = { data: "", code: 200 };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "内部错误", error);
      next(err);
    }
  }

  private async getMenuList(req: Request, res: Response, next: NF) {
    try {
      const mainMenuList = await ArticleCategory.find(
        { menuType: "mainMenu" },
        "_id articleType"
      );
      const secondaryMenu = await ArticleCategory.find(
        { menuType: "secondaryMenu" },
        "_id articleType"
      );

      const result: ApiResult = {
        data: { mainMenuList, secondaryMenu },
        code: 200,
      };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "内部错误", error);
      next(err);
    }
  }
  private async createArticles(req: Request, res: Response, next: NF) {
    const currentUser = httpContext.get("user");
    let result: ApiResult;
    try {
      const { _id, mainMenuId, secondaryMenuId, content } = req.body;
      if (_id) {
        await Articles.update(
          { _id },
          { mainMenuId, secondaryMenuId, content }
        );
        result = { data: "", code: 200 };
      } else {
        await Articles({
          mainMenuId,
          secondaryMenuId,
          content,
          creater: currentUser.userName,
        }).save();
        result = { data: "", code: 200 };
      }
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "fail", error);
      next(err);
    }
  }

  private async removeArticles(req: Request, res: Response, next: NF) {
    let result: ApiResult;
    try {
      const { _id } = req.query;
      await Articles.remove({ _id });
      result = { data: "success", code: 200 };
      res.json(result);
    } catch (error) {
      const err = new HTTPException(500, "fail");
      next(err);
    }
  }
  private async updateArticles(req: Request, res: Response, next: NF) {
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
  private async getList(req: Request, res: Response, next: NF) {
    try {
      const { _id } = req.query;
      console.log(_id);
      const x: any = [
        {
          $lookup: {
            from: "articlecategories",
            localField: "mainMenuId",
            foreignField: "_id",
            as: "mainMenu",
          },
        },

        {
          $lookup: {
            from: "articlecategories",
            localField: "secondaryMenuId",
            foreignField: "_id",
            as: "secondaryMenu",
          },
        },
      ];
      if (_id) {
        const y = {
          $match: {
            _id: mongoose.Types.ObjectId(_id),
          },
        };
        x.push(y);
      }
      const query = await Articles.aggregate(x);
      const result: ApiResult = { data: query, code: 200 };
      res.json(result);
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
}
