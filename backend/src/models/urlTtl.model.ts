import mongoose, { Schema, Model } from "mongoose";
import { IUrl } from "../ts/interfaces/url.interface";

const UrlTtlSchema: Schema<IUrl> = new Schema<IUrl>(
  {
    originalURL: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

UrlTtlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const UrlTtl: Model<IUrl> = mongoose.model<IUrl>(
  "urlTtl",
  UrlTtlSchema,
  "urlTtl"
);

export default UrlTtl;
