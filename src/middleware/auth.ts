import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import { verifyAccessToken } from "../utils/tokens";
import { User } from "../modules/users/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: "customer" | "admin";
      };
    }
  }
}

export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const headers = req.headers.authorization;

    if (!headers || !headers.includes("Bearer")) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "invalid token");
    }

    const token = headers.split(" ")[1];

    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.userId);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "user not found");
    }

    req.user = {
      userId: payload.userId.toString(),
      role: payload.role,
    };
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(httpStatus.UNAUTHORIZED, "invalid token"));
    }
  }
};

export const protectedRoute =
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
