import express, { Router } from "express";
import { getUserLinkedAccounts, twitterCallback, twitterLogin } from "../controllers/twitter.controller";
import { authMiddleware } from "../middlewares/isAuthenticated";

const router : Router = express.Router();

router.route('/twitter/login').get(authMiddleware, twitterLogin);

router.route('/twitter/callback').get(twitterCallback);

router.route('/twitter/linked-accounts').get(authMiddleware, getUserLinkedAccounts);

export default router;
