import { Document } from "mongoose";
export interface UserDocument extends Document {
  userName: string;
  passWord: string;
  avatar: string;
  email: string;
}
