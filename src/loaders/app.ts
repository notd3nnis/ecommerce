import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import ExpressMongoSanitize from "express-mongo-sanitize";

import { notFound } from "../middleware/notFound";
import { errorConverter, errorHandler } from "../middleware/errorHandler";
import routes from "../routes";
import productRoutes from "../routes/inventoryRoutes"

export default () => {
  const app = express();

  // Logging
  app.use(morgan("dev"));

  // Security //
  app.use(helmet());
  app.use(cors());
<<<<<<< HEAD:src/loaders/express.ts
  // app.use(ExpressMongoSanitize());
  app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
  app.use(cookieParser());
  app.use(express.json());
=======
>>>>>>> 54811e7e66e10e530bd26c8cd076987b3abf220e:src/loaders/app.ts

  // Body parsing
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ extended: true, limit: "30mb" }));
  app.use(cookieParser());

  // Sanitization
  // app.use(ExpressMongoSanitize());

  // Routes
  app.use("/api", routes);
  app.use("/api/product", productRoutes);

  // Error handling
  app.use(notFound);
  app.use(errorConverter);
  app.use(errorHandler);

  return app;
};
