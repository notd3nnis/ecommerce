import Http from "http";
import loader from "./loaders";

const PORT = 8000;

async function startServer(): Promise<void> {
  await loader.mongoose();

  const app = loader.express();

  const httpServer = Http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`server lisiting on ${PORT}`);
  });

  process.on("SIGTERM", () => {
    httpServer.close();
  });
}

startServer();
