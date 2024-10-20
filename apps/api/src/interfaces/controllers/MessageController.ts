import { SendMessageUseCase } from "@/application/usecases/SendMessageUseCase";
import { AnthropicClient } from "@/infrastructure/anthropic/AnthropicClient";
import type { Request, Response } from "express";
import { MessageRepository } from "../../interfaces/repositories/MessageRepository";

import { HttpMessages } from "@/constants/httpMessages";
import dotenv from "dotenv";

dotenv.config();

const anthropicClient = new AnthropicClient(
  process.env.ANTHROPIC_API_KEY as string,
);
const messageRepository = new MessageRepository(anthropicClient);
const sendMessageUseCase = new SendMessageUseCase(messageRepository);

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class MessageController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await sendMessageUseCase.execute(message);
      const [content] = response.content;

      return res.status(201).json({
        id: response.id,
        content:
          content?.type === "text" ? content.text : HttpMessages.ERROR_OCCURRED,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: HttpMessages.ERROR_OCCURRED });
    }
  }

  static healthCheck(_: Request, res: Response) {
    res.json({ status: HttpMessages.ERROR_OCCURRED });
  }
}
