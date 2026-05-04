import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";

export const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        param: req.params,
        query: req.query,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues
          .map((err) => {
            return `${err.path.join(". ")}: ${err.message}`;
          })
          .join(", ");

        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
    }
    next();
  };
