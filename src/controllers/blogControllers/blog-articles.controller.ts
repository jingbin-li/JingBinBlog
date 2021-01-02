import { AController } from "../../abstract/AController.controller";
import { ApiResult, IController } from "../../interface";
import { Router, Request, Response, NextFunction as NF, json } from "express";
import getArticlesList from "../../common/common.service";
export class ArticlesController extends AController implements IController {
  protected basePath: string;
  public router: Router;
  constructor() {
    super();
    this.basePath = "/articles";
    this.router = Router();
    this.attachToRoutes();
  }
  protected attachToRoutes(): void {
    this.router.get(`${this.basePath}/articlesDetial`, this.getArticleDetails);
  }
  private async getArticleDetails(req: Request, res: Response, next: NF) {
    try {
      const { id } = req.query;
      const article = await getArticlesList("articles", <string>id);
      res.json(article);
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
}
