import { Schema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      schema.parse(req.body);

      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          status: 400,
          message: e.errors.map((error: any) => error.message),
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Error interno del servidor",
        });
      }
    }
  };
