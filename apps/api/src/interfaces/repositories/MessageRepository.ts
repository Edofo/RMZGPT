import type { Message } from "@/domain/models/Message";
import type { AnthropicClient } from "@/infrastructure/anthropic/AnthropicClient";

export class MessageRepository {
  private readonly anthropicClient: AnthropicClient;

  constructor(anthropicClient: AnthropicClient) {
    this.anthropicClient = anthropicClient;
  }

  async sendMessage(message: Message) {
    return await this.anthropicClient.sendMessage(message.content);
  }
}
