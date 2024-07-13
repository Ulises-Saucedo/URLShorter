import { Request } from "express";
import { RegisterBody } from "../types/register.type";

export interface RegisterRequest extends Request {
  body: RegisterBody;
}
