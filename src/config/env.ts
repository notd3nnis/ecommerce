import dotenv from "dotenv";
import { z } from "zod";
import { ZodError } from "zod";

import { logger } from "./logger";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(8000),
  MONGO_DB_URL: z.string().min(1, "Mongo db is required "),
  JWT_ACCESS_SECRET: z.string().min(32, "Jwt access secret must be 32"),
  JWT_REFRESH_SECRET: z.string().min(32, "Jwt refresh secret must be 32"),
});

type envType = z.infer<typeof envSchema>;

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
