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
    this.router.get(
      `${this.basePath}/commentsList`,
      this.getCommentsList.bind(this)
    );
    this.router.post(
      `${this.basePath}/saveComments`,
      this.saveComments.bind(this)
    );
  }
  private async getCommentsList(req: Request, res: Response, next: NF) {
    try {
      const { articleId } = req.query;
      const mainTree = await MainTree.findOne({ articleId });
      console.log("mainTree", mainTree.tree);
      const x = await this.recursion(mainTree.tree);
      const result: ApiResult = { data: mainTree, code: 200 };
      res.json("");
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
  private async recursion(nodeinfo) {
    let x;
    const commentsTree = new CommentsTree();
    let info;
    for (const iterator of nodeinfo) {
      info = await NodeInfo.findOne({ _id: iterator.id });
      console.log("-------------------commentsTree----------");
      commentsTree.content = info.content;
      console.log(commentsTree);
      if (iterator.reply.length !== 0) {
        x = await this.recursion(iterator.reply);
        commentsTree.reply.push(x);
        console.log("----------x----------",commentsTree);
      }
    }
    return commentsTree;
  }
  private async saveComments(req: Request, res: Response, next: NF) {
    try {
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
        console.log("===>", tree);
        const treeRes = await new MainTree({
          articleId,
          mainCommentId: faId,
          tree,
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
    return {
      id,
      reply: [],
    };
  }
}

class CommentsTree {
  id: string;
  name: string;
  content: string;
  createTime: string;
  reply = [];
}
