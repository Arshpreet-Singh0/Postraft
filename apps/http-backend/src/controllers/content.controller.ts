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

export const schedulePost = async(req : Request, res : Response, next : NextFunction) : Promise<void> => {
  const { content, scheduledTime , twitterAccountId} = req.body;

  if(!content || !scheduledTime || !req.clerkId || !twitterAccountId){
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  try {
    const post = await prisma.scheduledPost.create({
      data: {
        content,
        scheduledTime: new Date(scheduledTime),
        clerkUserId : req.clerkId,
        twitterAccountId
      },
    });

    res.status(201).json({message : "Post Scheduled Successfully." ,success : true});
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "Failed to schedule post" });
  }
};

export const getUserScheduledPosts = async(req : Request, res : Response, next : NextFunction) : Promise<void> =>{
  try {
    const clerkUserId = req.clerkId;

    const scheduledPosts = await prisma.scheduledPost.findMany({
      where : {
        clerkUserId,
        scheduledTime : {
          gte : new Date()
        }
      },
      include : {
        TwitterAccount : {
          select : {
            name : true,
            username : true
          }
        }
      },
      orderBy : {
        scheduledTime : "asc"
      }
    });

    res.status(200).json(scheduledPosts);
  } catch (error) {
    next(error);
  }
}

export const getPublishedPosts = async(req : Request, res : Response, next : NextFunction) : Promise<void> =>{
  try {
    const clerkUserId = req.clerkId;

    const posts = await prisma.scheduledPost.findMany({
      where : {
        clerkUserId,
        status : "published",
      },
      include : {
        TwitterAccount : {
          select : {
            name : true,
            username : true
          }
        }
      },
      orderBy : {
        scheduledTime : "desc"
      }
    });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}