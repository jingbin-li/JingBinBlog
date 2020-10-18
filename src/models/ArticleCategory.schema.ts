import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { UserDocument } from "../interface";
import { ArticleCategoryDocument } from "../interface";
const ArticleCategoryDocument: Schema<ArticleCategoryDocument> = new Schema(
  {
    articleType: {
      type: String,
    },
    menuType: {
      type: String,
    },
    creater: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);

export const ArticleCategory: Model<ArticleCategoryDocument> = mongoose.model(
  "ArticleCategory",
  ArticleCategoryDocument
);
