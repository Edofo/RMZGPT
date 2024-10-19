// tests/interfaces/MessageRepository.test.ts
import { type Mock, describe, expect, it, vi } from "vitest";
import { Message } from "../../src/domain/models/Message";
import type { AnthropicClient } from "../../src/infrastructure/anthropic/AnthropicClient";
import { MessageRepository } from "../../src/interfaces/repositories/MessageRepository";

describe("MessageRepository", () => {
  const anthropicClient = {
    sendMessage: vi.fn(),
  } as unknown as AnthropicClient;

  const messageRepository = new MessageRepository(anthropicClient);

  it("should send a message to AnthropicClient", async () => {
    const messageContent = "Test Message";
    const message = new Message(messageContent);

    (anthropicClient.sendMessage as Mock).mockResolvedValue({
      id: "anthropic-123",
      content: messageContent,
    });

    const response = await messageRepository.sendMessage(message);

    expect(anthropicClient.sendMessage).toHaveBeenCalledWith(messageContent);
    expect(response).toEqual({
      id: "anthropic-123",
      content: messageContent,
    });
  });
});
