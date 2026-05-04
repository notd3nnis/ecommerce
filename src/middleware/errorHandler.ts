import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { env } from "../config/env";
import { logger } from "../config/logger";
import { ApiError } from "../utils/ApiError";
import { getStatusCodeFromError } from "../utils/helpers";

// Convert any error to ApiError
export const errorConverter = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = getStatusCodeFromError(error);
    const message =
      error.message ||
      (httpStatus[statusCode as keyof typeof httpStatus] as string);

    error = new ApiError(statusCode, message, false, error.stack);
  }

  next(error);
};

// Final error handler
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { statusCode, message } = err;

  // In production, don't leak error details for non-operational errors
  if (env.nodeEnv === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode as keyof typeof httpStatus] as string;
  }

  // Build response object
  const response = {
    error: true,
    code: statusCode,
    message,
    ...(env.nodeEnv === "development" && {
      stack: err.stack,
      path: req.path,
      method: req.method,
    }),
  };

  // Log the error with context
  logger.error({
    message: err.message,
    statusCode,
    path: req.path,
    method: req.method,
    ...(env.nodeEnv === "development" && { stack: err.stack }),
  });

  // Send error response
  res.status(statusCode).send(response);
};
