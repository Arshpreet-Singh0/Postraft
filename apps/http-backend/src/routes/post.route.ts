import express, { Router } from "express";
import { authMiddleware } from "../middlewares/isAuthenticated";
import { deleteScheduledPost, editPost, getPublishedPosts, getUserScheduledPosts, postTweet, schedulePost } from "../controllers/post.controller";

const router : Router = express.Router();

router.route('/twitter/post').post(authMiddleware, postTweet);

router.route('/twitter/schedule').post(authMiddleware, schedulePost);

router.route('/twitter/upcoming').get(authMiddleware, getUserScheduledPosts);

router.route('/twitter/published').get(authMiddleware, getPublishedPosts);

router.route('/twitter/post/:id').delete(authMiddleware, deleteScheduledPost);

router.route('/twitter/post/:id').put(authMiddleware, editPost);


export default router;
