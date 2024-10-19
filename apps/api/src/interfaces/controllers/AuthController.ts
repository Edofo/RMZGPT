import GetMeUseCase from "@/application/auth/usecases/getMe";
import LoginUserUseCase from "@/application/auth/usecases/loginUser";
import RegisterUserUseCase from "@/application/auth/usecases/registerUser";
import type { Request, Response } from "express";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const registerUser = new RegisterUserUseCase();

    try {
      const user = await registerUser.execute(username, email, password);
      res.status(201).json({ message: "User registered", user });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ error: error.message });
      }
      return res.status(500).send({ error: "An unknown error occurred" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginUser = new LoginUserUseCase();

    try {
      const { user, token } = await loginUser.execute(email, password);
      res.json({ message: "Logged in", user, token });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ error: error.message });
      }
      return res.status(500).send({ error: "An unknown error occurred" });
    }
  }

  static async me(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.user?.id;
    const getMe = new GetMeUseCase();

    try {
      const user = await getMe.execute(userId);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ error: error.message });
      }
      return res.status(500).send({ error: "An unknown error occurred" });
    }
  }

  static healthCheck(req: Request, res: Response) {
    res.json({ status: "ok" });
  }
}
