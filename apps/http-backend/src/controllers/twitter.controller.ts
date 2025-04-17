import { prisma } from "@repo/db/client";
import { NextFunction, Request, Response } from "express";
import { saveTwitterCredentialsSchema } from "../validations/twitterValidations";
import ExpressError from "../utils/errorHandler";
import crypto from "crypto";
import axios from "axios";
import { log } from "console";


const client_id = process.env.TWITTER_CLIENT_ID!;
const redirect_uri = "http://127.0.0.1:8080/api/v1/twitter/callback";

export const twitterLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.clerkId) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const code_verifier = crypto.randomBytes(64).toString("hex");
    const code_challenge = crypto
      .createHash("sha256")
      .update(code_verifier)
      .digest()
      .toString("base64url");

    const state = crypto.randomBytes(16).toString("hex"); // unique identifier
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Store session with upsert
    await prisma.twitterAuthSession.upsert({
      where: { clerkUserId : req.clerkId }, // state must be unique in schema
      update: {
        codeVerifier: code_verifier,
        expiresAt,
      },
      create: {
        clerkUserId : req.clerkId,
        codeVerifier: code_verifier,
        expiresAt
      },
    });

    const params = new URLSearchParams({
      response_type: "code",
      client_id,
      redirect_uri,
      scope: "tweet.read tweet.write users.read offline.access",
      state : req.clerkId,
      code_challenge,
      code_challenge_method: "S256",
    });

    const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
    res.redirect(authUrl);
  } catch (error) {
    console.error("Twitter Login Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



export const twitterCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const code = req.query.code as string;
    const state = req.query.state as string;

    if (!code || !state) {
      res.status(400).json({ message: "Missing code or state" });
      return;
    }

    // 1. Retrieve session from DB
    const session = await prisma.twitterAuthSession.findUnique({
      where: { clerkUserId : state.trim() }
    });

    console.log(session);
    
    if (!session || new Date(session.expiresAt) < new Date()) {
      res.status(400).json({ message: "Invalid or expired session" });
      return;
    }
    console.log(new Date(session.expiresAt));

    const code_verifier = session.codeVerifier;

    const tokenUrl = "https://api.twitter.com/2/oauth2/token";
    const redirect_uri = "http://127.0.0.1:8080/api/v1/twitter/callback";
    const clientId = process.env.TWITTER_CLIENT_ID!;
    const clientSecret = process.env.TWITTER_CLIENT_SECRET!;
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const payload = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: process.env.TWITTER_CLIENT_ID!,
      redirect_uri,
      code_verifier,
    });

    // 2. Get tokens from Twitter
    const response = await axios.post(tokenUrl, payload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${credentials}`, // 🔥 Required for Twitter
      },
    });

    console.log(response.data);
    

    const { access_token, refresh_token, expires_in, scope, token_type } = response.data;

    // 3. Fetch user info from Twitter
    const userInfo : {
      data : {
        data : {
            name : string, username : string, id : string
        }
      }
    } = await axios.get("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(userInfo);
    

    const {name, username, id} = userInfo.data.data;
    const currentDate = new Date();
    const after5Months = new Date(currentDate);
    after5Months.setMonth(after5Months.getMonth() + 5);

    await prisma.twitterAccount.upsert({
      where: {
        clerkUserId : state
      },
      update: {
        clerkUserId: state,
        username,
        name,
        accessToken: access_token,
        refreshToken: refresh_token,
        accessTokenExpiresAt : new Date(currentDate.getTime() + expires_in * 1000),
        refreshTokenExpiresAt : after5Months
      },
      create: {
        clerkUserId: state,
        twitterId: id,
        username,
        name,
        accessToken: access_token,
        accessTokenExpiresAt : new Date(currentDate.getTime() + expires_in * 1000),
        refreshTokenExpiresAt : after5Months
      },
    });

    const twitterUser = userInfo.data;

    console.log("✅ Twitter User:", twitterUser);

    res.redirect("http://localhost:3000/dashboard");
  } catch (error: any) {
    console.error("Twitter callback error:", error.response?.data || error.message);
    res.status(500).send("Twitter callback failed");
  }
};

export const getUserLinkedAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accounts = await prisma.twitterAccount.findMany({
      where : {
        clerkUserId : req.clerkId,
      },
      select : {
        name : true,
        username : true,
        twitterId : true,
        refreshTokenExpiresAt : true
      }
    })

    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
}