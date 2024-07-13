import jwt from "jsonwebtoken";
import { UserPayload } from "../ts/types/user.type";

const SECRET_KEY: string = process.env.SECRET_KEY as string;

export const createToken = (payload: UserPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" }, (err, token) => {
      if (err || !token) {
        reject(new Error("Error al crear la token"));
      } else {
        resolve(token);
      }
    });
  });
};
