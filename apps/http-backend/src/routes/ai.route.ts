import express, { Router } from "express";
import { authMiddleware } from "../middlewares/isAuthenticated";
import { generatePost } from "../controllers/ai.controller";

const router : Router = express.Router();

router.route('/generate').post(authMiddleware, generatePost);

export default router;
