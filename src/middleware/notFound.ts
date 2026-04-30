import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.send(404);
  const error = new Error(`page not found", ${req.originalUrl}`);

  next(error);
};
