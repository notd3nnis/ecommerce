import httpStatus from "http-status";
import mongoose from "mongoose";

// Helper function to determine status code from error type
export const getStatusCodeFromError = (error: Error): number => {
  if ((error as any).statusCode) {
    return (error as any).statusCode;
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return httpStatus.BAD_REQUEST;
  }
  if (error instanceof mongoose.Error.CastError) {
    return httpStatus.BAD_REQUEST;
  }
  if ((error as any).code === 11000) {
    // MongoDB duplicate key error
    return httpStatus.CONFLICT;
  }
  if (error instanceof mongoose.Error) {
    return httpStatus.BAD_REQUEST;
  }

  return httpStatus.INTERNAL_SERVER_ERROR;
};
