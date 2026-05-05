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

const auth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const headers = req.headers.authorization;

    if (!headers || !headers.includes("Brears")) {
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
      next(new ApiError(httpStatus.UNAUTHORIZED, "invalid token "));
    }
  }
};

export default { auth };
