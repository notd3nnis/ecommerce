import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(
    httpStatus.NOT_FOUND,
    `page not found", ${req.originalUrl}`,
  );

  res.json({
    statusCode: httpStatus.NOT_FOUND,
    message: error.message,
  });

  next(error);
};
