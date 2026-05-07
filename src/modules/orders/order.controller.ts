import { Request, Response } from "express";
import httpStatus from "http-status";
import { IOrderType } from "../../types/IOrder";
import { catchAsync } from "../../utils/catchAsync";
import { checkOut } from "./order.service";

// export const NewOrder = catchAsync(

// );
