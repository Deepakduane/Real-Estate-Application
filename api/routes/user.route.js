import express from "express";
import { getNotificationNumber, getUsers, getUser, updateUser, deleteUser , savePost, profilePosts} from "../controllers/user.controller.js";
import { verifyTokens } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
//router.get("/:id",verifyTokens, getUser);
router.put("/:id", verifyTokens ,updateUser);
router.delete("/:id", verifyTokens, deleteUser);
router.post("/save", verifyTokens, savePost);
router.get("/profilePosts", verifyTokens, profilePosts);
router.get("/notification", verifyTokens, getNotificationNumber);

export default router;