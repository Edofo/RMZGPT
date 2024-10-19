import GetMeUseCase from "@/application/auth/usecases/getMe";
import * as dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

dotenv.config();

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "") as
        | { id: string; email: string }
        | string;
      if (!decoded || typeof decoded === "string") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await new GetMeUseCase().execute(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // @ts-ignore
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}
