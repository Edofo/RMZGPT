import request from "supertest";
import { type Mock, describe, expect, it, vi } from "vitest";
import { app } from ".";
import { sendMessage } from "./antropic";

vi.mock("./antropic", () => ({
  sendMessage: vi.fn(),
}));

describe("API Tests", () => {
  it("should return health status", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("should send a message and return the response", async () => {
    const mockResponse = {
      id: "123",
      content: [{ type: "text", text: "Hello!" }],
    };

    (sendMessage as Mock).mockResolvedValue(mockResponse);

    const response = await request(app)
      .post("/send-message")
      .send({ message: "Test message" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: "123",
      content: "Hello!",
    });
  });

  it("should return error if message is not provided", async () => {
    const response = await request(app).post("/send-message").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Message is required" });
  });

  it("should handle server errors gracefully", async () => {
    (sendMessage as Mock).mockRejectedValue(new Error("Something went wrong"));

    const response = await request(app)
      .post("/send-message")
      .send({ message: "Test message" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "An error occurred" });
  });

  it("should return 'Hello World!' for the root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
