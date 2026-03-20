
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import { router } from "./routes";
import { env } from './config/env';
import { errorMiddleware } from './middleware/error.middleware';

export const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());


app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

app.use("/api", router);

app.use(errorMiddleware);

app.listen(env.port, () => {
  console.log(`🚀 Server running on http://localhost:${env.port}`);
});