import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Types } from "mongoose";

type TokenPayload = {
  userId: Types.ObjectId;
  role: string;
};

export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: "15m",
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtAccessSecret);
};

export const generateTokenPairs = (payload: TokenPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
