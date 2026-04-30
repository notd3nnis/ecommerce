import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { notFound } from "../middleware/notFound";
import { errorHandler } from "../middleware/errorHandler";
import routes from "../routes";

export default () => {
  const app = express();

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
  app.use(cookieParser());
  app.use(express.json());

  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
