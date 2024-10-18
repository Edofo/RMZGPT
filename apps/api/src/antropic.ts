import Anthropic from "@anthropic-ai/sdk";
import { config } from "dotenv";

config();

const initializeAnthropic = () => {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
};

export const anthropicClient = initializeAnthropic();

type SendMessage = {
  message: string;
  model?: string;
  max_tokens?: number;
};

export const sendMessage = async ({
  message,
  max_tokens = 1024,
  model = "claude-3-5-sonnet-20240620",
}: SendMessage) => {
  const msg = await anthropicClient.messages.create({
    model,
    max_tokens,
    messages: [{ role: "user", content: message }],
  });

  return msg;
};
