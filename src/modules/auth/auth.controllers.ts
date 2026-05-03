import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import authServices from "./auth.services";
import httpStatus from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authServices.createUser(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export default { register };
