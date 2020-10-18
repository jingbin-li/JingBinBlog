import * as mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import { ImagePathDocument } from "../interface";
const ImagePathDocument: Schema<ImagePathDocument> = new Schema(
  {
    imagePath: {
      type: String,
    },
    imageType: String,
  },
  { timestamps: { createdAt: "createTime", updatedAt: "updateTime" } }
);
export const ImagePath: Model<ImagePathDocument> = mongoose.model(
  "ImagePath",
  ImagePathDocument
);
