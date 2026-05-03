import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";

export const validateSch =
  (schema: ZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        param: req.params,
        query: req.query,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const err = error.issues
          .map((err) => {
            `${err.path.join(". ")}: ${err.message}`;
          })
          .join(", ");

        return next(new ApiError(httpStatus.BAD_REQUEST, err));
      }
      next(error);
    }
  };
