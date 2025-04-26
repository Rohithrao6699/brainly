declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT: number;
      MONGO_URI: string;
    }
  }
}
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/router";
import errorMiddleware from "./middleware/errorMiddleware";
import config from "./config/config";

const app = express();
main();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

async function main() {
  app.listen(config.port, function () {
    console.log("listening on port 3000");
  });
  await mongoose.connect(config.mongo_uri);
}

app.use(errorMiddleware);

export default app;
