import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { ICommentsNodeInfo } from "../interface";
const CommentsNodeInfo: Schema<ICommentsNodeInfo> = new Schema(
  {
    content: {
      type: String,
    },
    comments_user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    articles_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);

export const NodeInfo: Model<ICommentsNodeInfo> = mongoose.model(
  "CommentsNodeInfo",
  CommentsNodeInfo
);

// title: string;
// content: string;
// creater: string;
// picture: string;
// cover: string;
