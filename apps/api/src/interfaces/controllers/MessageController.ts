import type { Request, Response } from "express";
import { SendMessageUseCase } from "../../application/usecases/SendMessageUseCase";
import { MessageService } from "../../domain/services/MessageService";
import { AnthropicClient } from "../../infrastructure/anthropic/AnthropicClient";
import { MessageRepository } from "../../interfaces/repositories/MessageRepository";

import dotenv from "dotenv";

dotenv.config();

const messageService = new MessageService();
const anthropicClient = new AnthropicClient(
  process.env.ANTHROPIC_API_KEY as string,
);
const messageRepository = new MessageRepository(anthropicClient);
const sendMessageUseCase = new SendMessageUseCase(
  messageService,
  messageRepository,
);

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class MessageController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).send({ error: "Message is required" });
      }

      const response = await sendMessageUseCase.execute(message);
      const [content] = response.content;

      return res.status(201).send({
        id: response.id,
        content: content?.type === "text" ? content.text : "An error occurred",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).send({ error: error.message });
      }

      return res.status(500).send({ error: "An unknown error occurred" });
    }
  }

  static healthCheck(req: Request, res: Response) {
    res.json({ status: "ok" });
  }
}
