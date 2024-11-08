import { SendMessageUseCase } from "@/application/usecases/SendMessageUseCase";
import { HttpMessages } from "@/constants/httpMessages";
import { MessageController } from "@/interfaces/controllers/MessageController";
import type { MessageRepository } from "@/interfaces/repositories/MessageRepository";
import type { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/application/usecases/SendMessageUseCase");

describe("MessageController", () => {
  let sendMessageUseCase: SendMessageUseCase;
  let messageRepository: MessageRepository;

  beforeEach(() => {
    messageRepository = {} as MessageRepository;
    sendMessageUseCase = new SendMessageUseCase(messageRepository);
  });

  describe("sendMessage", () => {
    it("should return 400 if message is not provided", async () => {
      const req = { body: {} } as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await MessageController.sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Message is required" });
    });

    it("should return 201 and message content if sendMessageUseCase executes successfully", async () => {
      const req = { body: { message: "Test message" } } as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      const executeResponse = {
        id: "123",
        content: [{ type: "text", text: "Success" }],
      };

      sendMessageUseCase.execute = vi.fn().mockResolvedValue(executeResponse);

      console.log("Before sendMessage call", { req, res });
      await MessageController.sendMessage(req, res);
      console.log("After sendMessage call", { res });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: "123",
        content: [{ type: "text", text: "Success" }],
      });
    });

    it("should return 500 if sendMessageUseCase throws an error", async () => {
      const req = { body: { message: "Test message" } } as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      const errorMessage =
        "Cannot read properties of undefined (reading 'content')";

      sendMessageUseCase.execute = vi
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await MessageController.sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("healthCheck", () => {
    it("should return status with ERROR_OCCURRED", () => {
      const req = {} as Request;
      const res = {
        json: vi.fn(),
      } as unknown as Response;

      MessageController.healthCheck(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: HttpMessages.ERROR_OCCURRED,
      });
    });
  });
});
