import { AController } from "../../abstract/AController.controller";
import { ApiResult, IController } from "../../interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import getArticlesList from "../../common/common.service";
import { CommentsUser, NodeInfo, MainTree } from "../../models";
import * as mongoose from "mongoose";
import * as moment from "moment";
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
      const { articleId, commentType } = req.query;
      console.log("========>", req.query);
      const paramsList = [];
      paramsList.push(
        {
          $lookup: {
            from: "commentsuserinfos",
            localField: "comments_user_id",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $match: {
            commentType,
          },
        }
      );
      if (articleId) {
        paramsList.push({
          $match: {
            articles_id: mongoose.Types.ObjectId(<string>articleId),
          },
        });
      }
      const nodeInfo = await NodeInfo.aggregate(paramsList);
      const total = nodeInfo.length;
      const tree = this.treeBuild(nodeInfo);
      res.json({ tree, total });
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
  private treeBuild(data) {
    const idList = {};
    const result = [];
    for (const item of data) {
      const userInfo = item.userInfo[0];
      item.userId = userInfo._id;
      item.name = userInfo.name;
      item.email = userInfo.email;
      item.http = userInfo.http;
      item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
      if (!item.parent_id) {
        result.push(item);
      }
      idList[item._id] = item;
    }
    for (const item of data) {
      const parentId = item.parent_id;
      if (!parentId) {
        continue;
      }
      if (idList[parentId].reply) {
        idList[parentId].reply.push(item);
      } else {
        idList[parentId].reply = [item];
      }
    }
    return result;
  }
  private async saveComments(req: Request, res: Response, next: NF) {
    try {
      const {
        name,
        email,
        http,
        articleId,
        commentType,
        content,
        parentId,
      } = req.body;
      const userInfo = await new CommentsUser({
        name,
        email,
        http,
      }).save();
      const x = await new NodeInfo({
        content,
        articles_id: articleId,
        parent_id: parentId,
        comments_user_id: userInfo._id,
        commentType,
      }).save();
      const result: ApiResult = { data: "success", code: 200 };
      res.json(result);
    } catch (error) {
      const result: ApiResult = { data: error, code: 500 };
      next(result);
    }
  }
}

class CommentsTree {
  id: string;
  name: string;
  content: string;
  createTime: string;
  reply = [];
}
