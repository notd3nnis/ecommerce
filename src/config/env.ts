import dotenv from "dotenv";
import { ZodError } from "zod";
import { envSchema, envType } from "../utils/env.validation";
import { logger } from "./logger";

dotenv.config();

const validateEnv = () => {
  try {
    const env: envType = envSchema.parse(process.env);

    return {
      nodeEnv: env.NODE_ENV,
      port: +env.PORT,
      mongoUri: env.MONGO_DB_URL,
      jwtAccessSecret: env.JWT_ACCESS_SECRET,
      jwtRefreshSecret: env.JWT_REFRESH_SECRET,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error("Invalid environment variables:");

      logger.error(
        error.issues.map((issues) => ({
          path: issues.path.join("."),
          message: issues.message,
        })),
      );
    } else {
      logger.error("Unexpected error during environment validation:", error);
    }
    process.exit(1);
  }
};

export const env = validateEnv();
