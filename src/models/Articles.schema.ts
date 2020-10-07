import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { ArticlesDocument } from "../interface";
const ArticlesDocument: Schema<ArticlesDocument> = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    creater: {
      type: String,
    },
    pictrure: {
      type: String,
    },
    cover: {
      type: String,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
    }
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);

export const Articles: Model<ArticlesDocument> = new Model(
  "Articles",
  ArticlesDocument
);

// title: string;
// content: string;
// creater: string;
// picture: string;
// cover: string;
