import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserJwtPayload extends JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: UserJwtPayload;
}
