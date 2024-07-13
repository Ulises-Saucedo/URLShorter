import { Document, ObjectId } from "mongoose";

export interface IUrl extends Document {
  _id: string;
  originalURL: string;
  shortURL: string;
  user: ObjectId;
}
