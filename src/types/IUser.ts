import { Document } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  role: "customer" | "admin";
  password: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  created_at: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}
