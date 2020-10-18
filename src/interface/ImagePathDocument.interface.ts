import { Document } from "mongoose";
export interface ImagePathDocument extends Document {
  imagePath: string;
  imageType: string;
}
