import express, { Router } from "express";
import { saveTwitterCredentials } from "../controllers/twitter.controller";
import { authMiddleware } from "../middlewares/isAuthenticated";
import { requireAuth } from "@clerk/express";

const router : Router = express.Router();

router
  .route("/save-twitter-credentials")
  .post( authMiddleware, saveTwitterCredentials);

export default router;
