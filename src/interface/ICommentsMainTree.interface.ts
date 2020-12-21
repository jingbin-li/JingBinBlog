import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ICommentsMainTree extends Document {
  tree: string;
}
