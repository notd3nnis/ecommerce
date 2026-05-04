import { User } from "../users/user.model";
import { ApiError } from "../../utils/ApiError";
import httpStatus from "http-status";
import { IUserType } from "../../types/IUser";
import { generateTokenPairs } from "../../utils/tokens";
import { email } from "zod";

const createUser = async (userBody: IUserType) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.CONFLICT, "email already registered");
  }

  const user = await User.create({
    ...userBody,
  });

  const tokens = generateTokenPairs({
    userId: user._id,
    role: user.role,
  });

  user.refreshToken = tokens.refreshToken;
  await user.save();

  return {
    Name: user.name,
    Email: user.email,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
    createdAt: user.created_at,
    tokens,
  };
};

export default { createUser };
