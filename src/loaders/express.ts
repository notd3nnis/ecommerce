import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { notFound } from "../middleware/notFound";
import { errorHandler } from "../middleware/errorHandler";
import routes from "../routes";

export default () => {
  const app = express();

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());

  app.use(express.json());

  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
