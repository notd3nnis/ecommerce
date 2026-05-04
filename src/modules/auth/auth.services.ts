import { User } from "../users/user.model";
import { ApiError } from "../../utils/apiError";
import httpStatus from "http-status";
import { IUser } from "../../types/IUser";
import { generateTokenPairs } from "../../utils/tokens";

const createUser = async (
  userBody: Pick<IUser, "name" | "email" | "password">,
) => {
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
    tokens,
  };
};

const login = async ({
  email,
  password,
}: Pick<IUser, "email" | "password">) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    throw new ApiError(httpStatus.UNAUTHORIZED, "invalid email or password!");

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword)
    throw new ApiError(httpStatus.UNAUTHORIZED, "invalid email or password!");

  const tokens = generateTokenPairs({ userId: user._id, role: user.role });

  user.refreshToken = tokens.refreshToken;
  await user.save();

  return {
    Name: user.name,
    Email: user.email,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
    tokens: tokens,
  };
};

export default { createUser, login };
