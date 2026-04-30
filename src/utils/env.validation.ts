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
});

export type envType = z.infer<typeof envSchema>;
