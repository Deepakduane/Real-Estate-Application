import express from "express";
import { getChats, getChat, addChat, readChat} from "../controllers/chat.controller.js";
import { verifyTokens } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/",verifyTokens, getChats);
router.get("/:id",verifyTokens, getChat);
router.post("/", verifyTokens, addChat);
router.put("/read/:id", verifyTokens, readChat);

export default router;