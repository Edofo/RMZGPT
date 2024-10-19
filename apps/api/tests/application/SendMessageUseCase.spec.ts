// tests/application/SendMessageUseCase.test.ts
import { type Mock, describe, expect, it, vi } from "vitest";
import { SendMessageUseCase } from "../../src/application/usecases/sendMessage";
import { Message } from "../../src/domain/models/Message";
import { MessageService } from "../../src/domain/services/MessageService";
import type { MessageRepository } from "../../src/interfaces/repositories/MessageRepository";

describe("SendMessageUseCase", () => {
  const messageService = new MessageService();
  const messageRepository = {
    sendMessage: vi.fn(),
  } as unknown as MessageRepository;

  const sendMessageUseCase = new SendMessageUseCase(
    messageService,
    messageRepository,
  );

  it("should send a valid message", async () => {
    const messageContent = "Hello from Vitest";
    const message = new Message(messageContent);

    (messageRepository.sendMessage as Mock).mockResolvedValue({
      id: "123",
      content: messageContent,
    });

    const response = await sendMessageUseCase.execute(messageContent);

    expect(messageRepository.sendMessage).toHaveBeenCalledWith(message);
    expect(response).toEqual({
      id: "123",
      content: messageContent,
    });
  });

  it("should throw an error for an invalid message", async () => {
    const invalidMessageContent = "";
    await expect(
      sendMessageUseCase.execute(invalidMessageContent),
    ).rejects.toThrow("Invalid message");
  });
});
