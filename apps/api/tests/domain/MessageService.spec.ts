// tests/domain/MessageService.test.ts
import { describe, expect, it } from "vitest";
import { Message } from "../../src/domain/models/Message";
import { MessageService } from "../../src/domain/services/MessageService";

describe("Message Service", () => {
  const messageService = new MessageService();

  it("should return the message content when valid", async () => {
    const message = new Message("Test Message");
    const result = await messageService.sendMessage(message);
    expect(result).toBe("Test Message");
  });

  it("should throw an error when the message is invalid", async () => {
    const message = new Message("");
    await expect(messageService.sendMessage(message)).rejects.toThrow(
      "Invalid message",
    );
  });
});
