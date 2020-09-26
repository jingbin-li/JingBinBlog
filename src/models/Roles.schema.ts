import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { UserDocument } from "../interface";
import { RoleDocument } from "../interface/RoleDocument.interface";
const RoleDocument: Schema<RoleDocument> = new Schema(
  {
    role: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,//这里即为子表的外键，关联主表。  ref后的users代表的是主表users的Model。
    },
    creater: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);
export const Roles: Model<RoleDocument> = mongoose.model("Roles", RoleDocument);
