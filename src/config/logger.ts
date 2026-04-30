import winston from "winston";
import { env } from "./env";
const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;

const winstonFormat = printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp}: ${level}: ${stack || message}`,
);
export const logger = createLogger({
  level: env.nodeEnv === "development" ? "debug" : "info",
  format: combine(
    timestamp(),
    winstonFormat,
    env.nodeEnv === "development" ? colorize() : uncolorize(),
  ),
  transports: [new transports.Console()],
});
