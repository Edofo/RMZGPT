import Anthropic from "@anthropic-ai/sdk";
import express, { type Application } from "express";
require("dotenv").config();

const app: Application = express();
app.use(express.json());

async function initializeAnthropic(message: string) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [{ role: "user", content: message }],
  });

  return msg;
}

app.post("/send-message", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).send({ error: "Message is required" });
      return;
    }

    const response = await initializeAnthropic(message);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
