import mongoose, { Schema } from "mongoose";
import { IUrl } from "../ts/interfaces/url.interface";
import paginate from "mongoose-paginate-v2";

const UrlSchema: Schema<IUrl> = new Schema<IUrl>(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

UrlSchema.plugin(paginate);

const Url = mongoose.model<IUrl, mongoose.PaginateModel<IUrl>>(
  "url",
  UrlSchema
);

export default Url;
