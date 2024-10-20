import * as bycrpt from "bcryptjs";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();

const { JWT_SECRET = "" } = process.env;
interface payload {
  id: string;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Encrypt {
  static async passwordEncrypt(pass: string) {
    return bycrpt.hashSync(pass, 10);
  }
  static async comparePassword(pass: string, hash: string) {
    return bycrpt.compareSync(pass, hash);
  }
  static async generateToken(payload: payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
