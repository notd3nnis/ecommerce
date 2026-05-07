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
    const user = await User.findById(decoded.userId).select("+refreshToken");

    if (!user || !user.refreshToken.includes(refreshToken)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "invalide refresh token");
    }

    const payload = {
      userId: user._id,
      role: user.role,
    };

    const tokens = generateTokenPairs(payload);

    user.refreshToken = tokens.refreshToken;

    await user.save();

    return {
      tokens,
    };
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "invalide refresh token");
  }
};

const logout = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $unset: { refreshToken: "" },
    },
    { new: false },
  );

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return {
    message: "user successfully logged out",
  };
};

const me = async (userId: string) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  return {
    Name: user.name,
    Email: user?.email,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
  };
};
export default { createUser, login, refresh, me, logout };
