import { AController } from "../../abstract/AController.controller";
import { ApiResult, IController } from "../../interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import getArticlesList from "../../common/common.service";
export class AboutController extends AController implements IController {
  protected basePath: string;
  public router: Router;
  constructor() {
    super();
    this.basePath = "/about";
    this.router = Router();
    this.attachToRoutes();
  }
  protected attachToRoutes(): void {
    this.router.get(`${this.basePath}/aboutArticles`, this.getAboutArticles);
  }

  private async getAboutArticles(req: Request, res: Response, next: NF) {
    try {
      const result = await getArticlesList("about");
      res.json(result);
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
}
