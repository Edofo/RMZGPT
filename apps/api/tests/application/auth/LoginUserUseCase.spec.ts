import LoginUserUseCase from "@/application/auth/usecases/loginUser";
import { HttpMessages } from "@/constants/httpMessages";
import { Encrypt } from "@/infrastructure/helpers/Encrypt";
import userRepository from "@/interfaces/repositories/UserRepository";
import jwt from "jsonwebtoken";

import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/interfaces/repositories/UserRepository");
vi.mock("@/infrastructure/helpers/Encrypt");
vi.mock("jsonwebtoken");

describe("LoginUserUseCase", () => {
  let loginUserUseCase: LoginUserUseCase;

  beforeEach(() => {
    loginUserUseCase = new LoginUserUseCase();
  });

  it("should throw an error if the user is not found", async () => {
    (userRepository.findByEmail as Mock).mockResolvedValue(null);

    await expect(
      loginUserUseCase.execute("test@example.com", "password"),
    ).rejects.toThrow(HttpMessages.INVALID_CREDENTIALS);
  });

  it("should throw an error if the password is incorrect", async () => {
    const mockUser = {
      id: "123",
      email: "test@example.com",
      password: "hashedpassword",
    };
    (userRepository.findByEmail as Mock).mockResolvedValue(mockUser);

    (Encrypt.comparePassword as Mock).mockResolvedValue(false);

    await expect(
      loginUserUseCase.execute("test@example.com", "wrongpassword"),
    ).rejects.toThrow(HttpMessages.INVALID_CREDENTIALS);
  });

  it("should return a user and token if login is successful", async () => {
    const mockUser = {
      id: "123",
      email: "test@example.com",
      password: "hashedpassword",
    };

    (userRepository.findByEmail as Mock).mockResolvedValue(mockUser);
    (Encrypt.comparePassword as Mock).mockResolvedValue(true);

    (jwt.sign as Mock).mockReturnValue("mocked-jwt-token");

    const result = await loginUserUseCase.execute(
      "test@example.com",
      "password",
    );

    expect(result).toEqual({
      user: mockUser,
      token: "mocked-jwt-token",
    });
  });
});
