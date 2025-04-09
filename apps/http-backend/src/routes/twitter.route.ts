import express, { Router } from "express";
import { twitterCallback, twitterLogin } from "../controllers/twitter.controller";
import { authMiddleware } from "../middlewares/isAuthenticated";
import { requireAuth } from "@clerk/express";

const router : Router = express.Router();

router.route('/twitter/login').get(authMiddleware, twitterLogin);

router.route('/twitter/callback').get(twitterCallback);

export default router;
