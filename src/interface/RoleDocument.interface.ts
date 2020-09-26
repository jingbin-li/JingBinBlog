import { Document } from "mongoose";
export interface RoleDocument extends Document {
  role: string;
  userId: string;
  creater: string;
}
