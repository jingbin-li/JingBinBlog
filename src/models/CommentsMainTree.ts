import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { ICommentsMainTree } from "../interface";
const CommentsMainTree: Schema<ICommentsMainTree> = new Schema(
  {
    tree: {
      type: Array,
    },
    content:{
      type:String
    },
    articleId: {
      type:  mongoose.Schema.Types.ObjectId,
    },
    from_uid: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);

export const MainTree: Model<ICommentsMainTree> = mongoose.model(
  "CommentsMainTree",
  CommentsMainTree
);

// title: string;
// content: string;
// creater: string;
// picture: string;
// cover: string;
