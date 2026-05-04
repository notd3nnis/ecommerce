import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import authServices from "./auth.services";
import httpStatus from "http-status";
import { IUser } from "../../types/IUser";

const register = catchAsync(
  async (
    req: Request<{}, {}, Pick<IUser, "name" | "email" | "password">>,
    res: Response,
  ) => {
    const user = await authServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  },
);

const login = catchAsync(
  async (
    req: Request<{}, {}, Pick<IUser, "email" | "password">>,
    res: Response,
  ) => {
    const { email, password } = req.body;
    const user = await authServices.login({ email, password });

    res.status(httpStatus.OK).json({
      success: true,
      message: "login successful!",
      data: user,
    });
  },
);

export default { register, login };
