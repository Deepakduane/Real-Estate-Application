import express from "express";
import { verifyTokens } from "../middleware/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";


const router = express.Router();

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/",verifyTokens, addPost)
router.delete("/:id", verifyTokens, deletePost)

export default router;