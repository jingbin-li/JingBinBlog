import { AController } from "../../abstract/AController.controller";
import { ApiResult, IController } from "../../interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import getArticlesList from "../../common/common.service";
import { CommentsUser, NodeInfo, MainTree } from "../../models";
export class CommentsController extends AController implements IController {
  protected basePath: string;
  public router: Router;
  constructor() {
    super();
    this.basePath = "/comments";
    this.router = Router();
    this.attachToRoutes();
  }
  protected attachToRoutes(): void {
    this.router.get(`${this.basePath}/commentsList`, this.getCommentsList);
    this.router.post(`${this.basePath}/saveComments`, this.saveComments.bind(this));
  }
  private async getCommentsList(req: Request, res: Response, next: NF) {
    try {
      const result = await getArticlesList("about");
      res.json(result);
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }

  private async saveComments(req: Request, res: Response, next: NF) {
    console.log(this);

    try {
      console.log(this);
      const { name, email, http, articleId, commentType, content } = req.body;
      const user = await new CommentsUser({
        name,
        email,
        http,
      }).save();
      const nodeInfo = await new NodeInfo({
        content,
        articles_id: articleId,
        comments_user_id: user._id,
      }).save();
      if (commentType === "fatherComment") {
        const faId = nodeInfo._id;
        const tree = this.getTree(faId);
        console.log("===>");
        const treeRes = await new MainTree({
          articleId,
          mainCommentId: faId,
          tree: "123",
        }).save();
        console.log(treeRes);
      }
      res.json("");
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
  public getTree(id) {
    console.log("=====>getTree", id);
    return {
      id,
      reply: [],
    };
  }
}
