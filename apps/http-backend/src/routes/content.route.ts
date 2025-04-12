import express, { Router } from "express";
import { authMiddleware } from "../middlewares/isAuthenticated";
import { postTweet, schedulePost } from "../controllers/content.controller";

const router : Router = express.Router();

router.route('/twitter/post').post(authMiddleware, postTweet);

router.route('/twitter/schedule').post(authMiddleware, schedulePost);


export default router;
