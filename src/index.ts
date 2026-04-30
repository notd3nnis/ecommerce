import Http, { Server } from "http";
import loader from "./loaders";
import { env } from "./config/env";
import { logger } from "./config/logger";

const exitHandler = (server: Server) => {
  if (server) {
    server.close(() => {
      logger.info("server ");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

async function startServer(): Promise<void> {
  await loader.mongoose();

  const app = loader.express();

  const httpServer = Http.createServer(app);

  httpServer.listen(env.port, () => {
    logger.info(`server lisiting on ${env.port}`);
  });

  process.on("SIGTERM", () => {
    httpServer.close();
  });
}

startServer();
