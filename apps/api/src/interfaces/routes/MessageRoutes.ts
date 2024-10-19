import { Router } from "express";
import { MessageController } from "../controllers/MessageController";

const router = Router();

router.get("/health", MessageController.healthCheck);
router.post("/send-message", MessageController.sendMessage);

export default router;
