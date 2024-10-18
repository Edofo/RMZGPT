import Anthropic from "@anthropic-ai/sdk";
import express from "express";

const app = express();

async function initializeAnthropic() {
  const anthropic = new Anthropic({
    apiKey: "my_api_key",
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude" }],
  });

  console.log(msg);
}

initializeAnthropic();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
