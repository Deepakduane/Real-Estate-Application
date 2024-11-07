import express from "express";
import { shouldBeLoggedIn, shouldBeAdmin } from "../controllers/test.controller.js";
import { verifyTokens } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/admin",verifyTokens, shouldBeAdmin);
router.get("/logged", shouldBeLoggedIn)

export default router;