import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ICommentsUserInfo extends Document {
  name: string;
  email: string;
  http: string;
}
