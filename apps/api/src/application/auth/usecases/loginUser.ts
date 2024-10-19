import type { User } from "@/domain/models/User";
import { Encrypt } from "@/infrastructure/helpers/Encrypt";
import userRepository from "@/interfaces/repositories/UserRepository";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default class LoginUserUseCase {
  async execute(
    email: string,
    password: string,
  ): Promise<{
    user: User;
    token: string;
  }> {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await Encrypt.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? "",
      {
        expiresIn: "1h",
      },
    );

    return { user, token };
  }
}
