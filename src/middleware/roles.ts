import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";

export const role =
  (role: Array<"customer" | "admin">) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, "unauthorized route"));
    }

    if (!role.includes(user.role)) {
      return next(
        new ApiError(
          httpStatus.FORBIDDEN,
          "you do not have access to this route ",
        ),
      );
    }
    next();
  };
