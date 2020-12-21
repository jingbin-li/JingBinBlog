import { Router, Request, Response, NextFunction as NF } from "express";
import * as httpContext from "express-http-context";
import { ApiResult, IUsersList } from "../interface";
import { configure } from "log4js";
import * as fs from "fs";
import * as multiparty from "multiparty";
import * as moment from "moment";
import { Articles } from "../models/Articles.schema";
import * as mongoose from "mongoose";
const getArticlesList = async (type: string, _id?: string) => {
  try {
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
      {
        $match: {
          articlesType: type,
        },
      },
    ];
    if (_id) {
      const y = {
        $match: {
          _id: mongoose.Types.ObjectId(<string>_id),
        },
      };
      x.push(y);
    }
    const query = await Articles.aggregate(x);
    const result: ApiResult = { data: query, code: 200 };
    return result;
  } catch (error) {
    const result: ApiResult = { data: error, code: 500 };
    return result;
  }
};
export default getArticlesList;
