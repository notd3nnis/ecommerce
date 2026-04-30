import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.statusCode ?? 500;

  res.status(status).json({
    message: err.message,
    stack: err.stack,
  });
};
