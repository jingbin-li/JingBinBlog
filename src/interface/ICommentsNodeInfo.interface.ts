import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ICommentsNodeInfo extends Document {
  comments_user_id: mongoose.Schema.Types.ObjectId;
  content: string;
  children: string;
  articles_id: mongoose.Schema.Types.ObjectId;
}
