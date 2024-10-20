import GetMeUseCase from "@/application/auth/usecases/GetMeUseCase";
import { HttpMessages } from "@/constants/httpMessages";
import userRepository from "@/interfaces/repositories/UserRepository";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/interfaces/repositories/UserRepository");

describe("GetMeUseCase", () => {
  let getMeUseCase: GetMeUseCase;

  beforeEach(() => {
    getMeUseCase = new GetMeUseCase();
  });

  it("should return the user if the token is valid", async () => {
    const mockUser = {
      id: "123",
      email: "test@email.com",
      username: "test",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (userRepository.findById as Mock).mockResolvedValue(mockUser);

    await expect(getMeUseCase.execute("123")).resolves.toEqual(mockUser);
  });

  it("should throw an error if the user is not found", async () => {
    (userRepository.findById as Mock).mockResolvedValue(null);

    await expect(getMeUseCase.execute("123")).rejects.toThrow(
      HttpMessages.USER_NOT_FOUND,
    );
  });
});
