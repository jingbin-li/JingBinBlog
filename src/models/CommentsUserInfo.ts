import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { ICommentsUserInfo } from "../interface";
const CommentsUserInfo: Schema<ICommentsUserInfo> = new Schema(
  {
    name:{
      type:String
    },
    email:{
      type:String
    },
    http:{
      type:String
    },
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);

export const CommentsUser: Model<ICommentsUserInfo> = mongoose.model(
  "CommentsUserInfo",
  CommentsUserInfo
);

// title: string;
// content: string;
// creater: string;
// picture: string;
// cover: string;
