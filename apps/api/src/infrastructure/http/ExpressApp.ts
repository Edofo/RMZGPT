import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import messageRoutes from "../../interfaces/routes/MessageRoutes";

export const createApp = (): Application => {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cors());
  app.use(helmet());
  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "DELETE, POST, GET, OPTIONS, PUT, PATCH",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    next();
  });

  app.use(messageRoutes);

  return app;
};
