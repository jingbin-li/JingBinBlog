import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ArticlesDocument extends Document {
  title: string;
  content: string;
  creater: string;
  picture: string;
  cover: string;
  categoryId: mongoose.Schema.Types.ObjectId;
}
