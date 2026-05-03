import { Document, Model } from "mongoose";

export interface IUserType extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  isEmailVerified: boolean;
  refreshToken: string;
  created_at: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserType> {
  isEmailTaken: (email: string) => Promise<boolean>;
}
