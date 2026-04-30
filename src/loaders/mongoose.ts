import mongoose from "mongoose";
import { env } from "../config/env";
import { logger } from "../config/logger";
export default async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri);
    logger.info("MongoDB connected ");
    return connection;
  } catch (error) {
    logger.error("MongoDB connection error:", error);
  }
};
