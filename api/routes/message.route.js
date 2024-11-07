import express from "express";
import { addMessage} from "../controllers/message.controller.js";
import { verifyTokens } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:chatId", verifyTokens, addMessage);

export default router;