import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";

import { notFound } from "../middleware/notFound";
import { errorConverter, errorHandler } from "../middleware/errorHandler";
import routes from "../routes";

export default () => {
  const app = express();

  // Logging
  app.use(morgan("dev"));

  // Security //
  app.use(helmet());
  app.use(cors());

  // Body parsing
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ extended: true, limit: "30mb" }));
  app.use(cookieParser());

  // Sanitization
  // app.use(ExpressMongoSanitize());

  // Routes
  app.use("/api", routes);

  // Error handling
  app.use(notFound);
  app.use(errorConverter);
  app.use(errorHandler);

  return app;
};
