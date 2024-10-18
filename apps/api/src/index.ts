import Anthropic from "@anthropic-ai/sdk";
import express from "express";

const app = express();
app.use(express.json());

async function initializeAnthropic(message: string) {
  const anthropic = new Anthropic({
    apiKey: "my_api_key",
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
      return res.status(400).send({ error: "Message is required" });
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
