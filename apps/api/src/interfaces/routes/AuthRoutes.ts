import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/health", AuthController.healthCheck);
router.get("/me", AuthMiddleware.verifyToken, AuthController.me);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;
