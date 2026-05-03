import mongoose, { Schema } from "mongoose";
import { Iuser } from "../../types/IUser";

const userSchema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    phoneNumber: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minLength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<Iuser>("User", userSchema);
