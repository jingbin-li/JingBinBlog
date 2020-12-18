import { AController } from "../../abstract/AController.controller";
import { ApiResult, IController } from "../../interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import getArticlesList from "../../common/common.service";
export class HomeController extends AController implements IController {
  protected basePath: string;
  public router: Router;
  constructor() {
    super();
    this.basePath = "/home";
    this.router = Router();
    this.attachToRoutes();
  }
  protected attachToRoutes(): void {
    const path = this.basePath;
    this.router.get(`${path}/articlesList`, this.getBriefArticles);
  }

  private async getBriefArticles(req: Request, res: Response, next: NF) {
    try {
      const result = await getArticlesList();
      res.json(result);
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
}
