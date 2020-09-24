import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { UserDocument } from "../interface";
const UserDocument: Schema<UserDocument> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "用户名不能为空"],
      trim: true,
    },
    passWord: String,
    avatar: String,
    email: {
      type: String,
      trim: true,
    },
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);
export const Users: Model<UserDocument> = mongoose.model("Users", UserDocument);
