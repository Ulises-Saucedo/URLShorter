import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../ts/interfaces/user.interface";

const UserSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("user", UserSchema);

export default User;
