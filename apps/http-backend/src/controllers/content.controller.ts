import { prisma } from "@repo/db/client";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import qs from "qs";
import ExpressError from "../utils/errorHandler";

export const postTweet = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {
    try {
      const { text } = req.body;
      const { twitterId } = req.params;
      const clerkId = req.clerkId;
  
      let twitterAccount = await prisma.twitterAccount.findFirst({
        where: { clerkUserId: clerkId, twitterId },
      });
  
      if (!twitterAccount) {
        res.status(400).json({ message: "Invalid Twitter account" });
        return;
      }
  
      try {
        // 1st attempt to post the tweet
        const tweetResponse = await axios.post(
          "https://api.twitter.com/2/tweets",
          { text },
          {
            headers: {
              Authorization: `Bearer ${twitterAccount.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        res.status(200).json({ message: "Tweet posted!", tweet: tweetResponse.data });
      } catch (error: any) {
        if (error.response?.status === 401) {
          // Token might be expired, try to refresh
          if(!twitterAccount || !twitterAccount.refreshToken || !clerkId) {
                throw new ExpressError("not a valid account", 400);
          }
          const newAccessToken = await refreshTwitterToken(twitterAccount?.refreshToken, clerkId);
  
          // Retry with the new token
          const retryResponse = await axios.post(
            "https://api.twitter.com/2/tweets",
            { text },
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          res.status(200).json({ message: "Tweet posted after token refresh", tweet: retryResponse.data });
        }
  
        throw error; // other errors
      }
    } catch (err) {
      next(err);
    }
  };

async function refreshTwitterToken(refreshToken: string, clerkUserId: string) {
  try {
    const response = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.TWITTER_CLIENT_ID,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // 🔄 Update DB
    await prisma.twitterAccount.updateMany({
      where: { clerkUserId },
      data: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_in,
      },
    });

    return access_token;
  } catch (err) {
    //@ts-ignore
    console.error("Refresh failed:", err.response?.data || err.message);
    throw new Error("Refresh token expired or invalid. Re-authentication required.");
  }
}
