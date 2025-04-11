import express, { Router } from "express";
import { authMiddleware } from "../middlewares/isAuthenticated";
import { postTweet } from "../controllers/content.controller";

const router : Router = express.Router();

router.route('/twitter/post').post(authMiddleware, postTweet);

export default router;
