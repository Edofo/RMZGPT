import { sendMessage } from "./antropic";

import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
require("dotenv").config();

export const app: Application = express();

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
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/send-message", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).send({ error: "Message is required" });
      return;
    }

    const response = await sendMessage(message);
    const content = response.content[0];
    res.status(201).send({
      id: response.id,
      content: content?.type === "text" ? content.text : "An error occurred",
    });
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
});

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
