import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ArticleCategoryDocument extends Document {
  articleType: string;
  creater: string;
}
