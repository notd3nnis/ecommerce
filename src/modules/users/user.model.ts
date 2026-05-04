import mongoose, { Schema } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "../../types/IUser";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
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
      validate: (value: string) => {
        if (!validator.isEmail(value)) {
          throw new Error(" invalid email");
        }
      },
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minLength: 8,
      select: false,
      validate: (value: string) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password should contain atleast one uppercase and lowercase letter, number and special character",
          );
        }
      },
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.statics.isEmailTaken = async function (email: string) {
  const user = await this.findOne({ email });
  return Boolean(user);
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser, IUserModel>("User", userSchema);
