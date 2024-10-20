import GetMeUseCase from "@/application/auth/usecases/getMe";
import LoginUserUseCase from "@/application/auth/usecases/loginUser";
import RegisterUserUseCase from "@/application/auth/usecases/registerUser";
import { HttpMessages } from "@/constants/httpMessages";
import { AuthController } from "@/interfaces/controllers/AuthController";
import type { Request, Response } from "express";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/application/auth/usecases/registerUser");
vi.mock("@/application/auth/usecases/loginUser");
vi.mock("@/application/auth/usecases/getMe");

describe("AuthController - register", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: Mock;
  let statusMock: Mock;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: statusMock,
    };
  });

  it("should register a new user successfully", async () => {
    const mockUser = {
      id: "123",
      username: "testuser",
      email: "test@example.com",
    };
    const mockToken = "mocked-jwt-token";

    (RegisterUserUseCase.prototype.execute as Mock).mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    await AuthController.register(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      },
      token: mockToken,
    });
  });

  it("should return 409 if user already exists", async () => {
    (RegisterUserUseCase.prototype.execute as Mock).mockRejectedValue(
      new Error(HttpMessages.AUTH.USER_ALREADY_EXISTS),
    );

    await AuthController.register(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(409);
    expect(jsonMock).toHaveBeenCalledWith({
      error: HttpMessages.AUTH.USER_ALREADY_EXISTS,
    });
  });

  it("should return 500 on other errors", async () => {
    (RegisterUserUseCase.prototype.execute as Mock).mockRejectedValue(
      new Error("Some unknown error"),
    );

    await AuthController.register(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Some unknown error" });
  });
});

describe("AuthController - login", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: Mock;
  let statusMock: Mock;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: statusMock,
    };
  });

  it("should login a user successfully", async () => {
    const mockUser = {
      id: "123",
      username: "testuser",
      email: "test@example.com",
    };
    const mockToken = "mocked-jwt-token";

    (LoginUserUseCase.prototype.execute as Mock).mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    await AuthController.login(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      },
      token: mockToken,
    });
  });

  it("should return 401 if credentials are invalid", async () => {
    (LoginUserUseCase.prototype.execute as Mock).mockRejectedValue(
      new Error(HttpMessages.INVALID_CREDENTIALS),
    );

    await AuthController.login(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({
      error: HttpMessages.INVALID_CREDENTIALS,
    });
  });

  it("should return 500 on other errors", async () => {
    (LoginUserUseCase.prototype.execute as Mock).mockRejectedValue(
      new Error("Some unknown error"),
    );

    await AuthController.login(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Some unknown error" });
  });
});

describe("AuthController - me", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: Mock;
  let statusMock: Mock;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    req = {
      // @ts-ignore
      user: { id: "123" },
    };
    res = {
      status: statusMock,
    };
  });

  it("should return the user data successfully", async () => {
    const mockUser = {
      id: "123",
      username: "testuser",
      email: "test@example.com",
    };

    (GetMeUseCase.prototype.execute as Mock).mockResolvedValue(mockUser);

    await AuthController.me(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
    });
  });

  it("should return 500 if an error occurs", async () => {
    (GetMeUseCase.prototype.execute as Mock).mockRejectedValue(
      new Error("Some unknown error"),
    );

    await AuthController.me(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Some unknown error" });
  });
});
