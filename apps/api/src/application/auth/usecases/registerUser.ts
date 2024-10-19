import { User } from "@/domain/models/User";
import { Encrypt } from "@/infrastructure/helpers/Encrypt";
import userRepository from "@/interfaces/repositories/UserRepository";
import jwt from "jsonwebtoken";

export default class RegisterUserUseCase {
  async execute(
    username: string,
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const userExist = await userRepository.findByEmail(email);
    if (userExist) throw new Error("User with this email already exists");

    const hashedPassword = await Encrypt.passwordEncrypt(password);
    const user = new User(null, username, email, hashedPassword);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? "",
      {
        expiresIn: "1h",
      },
    );
    return {
      user: await userRepository.createUser(user),
      token,
    };
  }
}
