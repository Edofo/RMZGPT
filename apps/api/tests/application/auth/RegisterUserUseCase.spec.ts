import RegisterUserUseCase from "@/application/auth/usecases/registerUser";
import { HttpMessages } from "@/constants/httpMessages";
import { Encrypt } from "@/infrastructure/helpers/Encrypt";
import userRepository from "@/interfaces/repositories/UserRepository";
import jwt from "jsonwebtoken";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/interfaces/repositories/UserRepository");
vi.mock("@/infrastructure/helpers/Encrypt");
vi.mock("jsonwebtoken");

describe("RegisterUserUseCase", () => {
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    registerUserUseCase = new RegisterUserUseCase();
  });

  it("should throw an error if the user already exists", async () => {
    const mockExistingUser = {
      id: "123",
      email: "existing@example.com",
      username: "existing",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (userRepository.findByEmail as Mock).mockResolvedValue(mockExistingUser);

    await expect(
      registerUserUseCase.execute(
        "newuser",
        "existing@example.com",
        "password",
      ),
    ).rejects.toThrow(HttpMessages.AUTH.USER_ALREADY_EXISTS);
  });

  it("should create a new user if the email is not taken", async () => {
    const mockNewUser = {
      id: "123",
      email: "newuser@example.com",
      username: "newuser",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (userRepository.findByEmail as Mock).mockResolvedValue(null);
    (Encrypt.passwordEncrypt as Mock).mockResolvedValue("hashedpassword");
    (userRepository.createUser as Mock).mockResolvedValue(mockNewUser);
    (jwt.sign as Mock).mockReturnValue("mocked-jwt-token");

    const result = await registerUserUseCase.execute(
      "newuser",
      "newuser@example.com",
      "password",
    );

    expect(result).toEqual({ user: mockNewUser, token: "mocked-jwt-token" });
  });
});
