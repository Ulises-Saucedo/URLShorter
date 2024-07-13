import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../ts/interfaces/auth.interface";
import { UserJwtPayload } from "../ts/interfaces/auth.interface";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = process.env.SECRET_KEY as string;

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | undefined = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      status: 403,
      message: "Token no proveida",
    });

    return;
  }

  token = token.split(" ")[1];

  try {
    const payload = jwt.verify(token, SECRET_KEY) as UserJwtPayload;

    (req as AuthRequest).user = payload;

    next();
  } catch (e) {
    res.status(401).json({
      status: 401,
      message: "Token incorrecto",
    });

    return;
  }
};
