import { User } from "../users/user.model";
import { ApiError } from "../../utils/apiError";
import httpStatus from "http-status";
import { IUser } from "../../types/IUser";
import { generateTokenPairs, verifyRefreshToken } from "../../utils/tokens";

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

const refresh = async (refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "refresh token is required");
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "invalide refresh token");
    }

    const payload = {
      userId: user._id,
      role: user.role,
    };

    const { refreshToken: token } = generateTokenPairs(payload);

    user.refreshToken = token;

    await user.save;

    return {
      token,
    };
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "invalide refresh token");
  }
};

const logout = async (userId: string) => {
  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });
  return {
    message: "user successfully logged out",
  };
};

export default { createUser, login, refresh, logout };
