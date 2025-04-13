import express, { Router } from "express";
import { authMiddleware } from "../middlewares/isAuthenticated";
import { getPublishedPosts, getUserScheduledPosts, postTweet, schedulePost } from "../controllers/content.controller";

const router : Router = express.Router();

router.route('/twitter/post').post(authMiddleware, postTweet);

router.route('/twitter/schedule').post(authMiddleware, schedulePost);

router.route('/twitter/upcoming').get(authMiddleware, getUserScheduledPosts);

router.route('/twitter/published').get(authMiddleware, getPublishedPosts);

export default router;
