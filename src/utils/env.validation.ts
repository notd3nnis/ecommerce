import { z } from "zod";

export const envSchema = z.object({
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

export type envType = z.infer<typeof envSchema>;
