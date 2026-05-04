import { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  isEmailVerified: boolean;
  refreshToken: string;
}
export interface IUserMethods {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  isEmailTaken: (email: string) => Promise<boolean>;
}
