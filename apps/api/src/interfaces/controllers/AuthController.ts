import GetMeUseCase from "@/application/auth/usecases/getMe";
import LoginUserUseCase from "@/application/auth/usecases/loginUser";
import RegisterUserUseCase from "@/application/auth/usecases/registerUser";
import { HttpMessages } from "@/constants/httpMessages";
import type { Request, Response } from "express";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const registerUser = new RegisterUserUseCase();

    try {
      const { user, token } = await registerUser.execute(
        username,
        email,
        password,
      );
      res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case HttpMessages.AUTH.USER_ALREADY_EXISTS:
            return res.status(409).json({ error: error.message });
          default:
            return res.status(500).json({ error: error.message });
        }
      }
      return res.status(500).json({ error: HttpMessages.ERROR_OCCURRED });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginUser = new LoginUserUseCase();

    try {
      const { user, token } = await loginUser.execute(email, password);
      res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case HttpMessages.INVALID_CREDENTIALS:
            return res.status(401).json({ error: error.message });
          default:
            return res.status(500).json({ error: error.message });
        }
      }
      return res.status(500).json({ error: HttpMessages.ERROR_OCCURRED });
    }
  }

  static async me(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.user?.id;
    const getMe = new GetMeUseCase();

    try {
      const user = await getMe.execute(userId);
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: HttpMessages.ERROR_OCCURRED });
    }
  }

  static healthCheck(_: Request, res: Response) {
    res.json({ status: HttpMessages.OK });
  }
}
