import cron from "node-cron";
import { prisma } from "@repo/db/client";
import { postToTwitter } from "../utils/postToTwitter";

export const startPostScheduler = () => {
    cron.schedule("* * * * *", async () => {
      const now = new Date();
  
      const duePosts = await prisma.scheduledPost.findMany({
        where: {
          scheduledTime: {
            lte: now,
          },
          status: "pending",
        },
      });
  
      for (const post of duePosts) {
        console.log(post);
        
        postToTwitter(post.content, post.twitterAccountId, post.clerkUserId, post.id);
      }
    });
  
    console.log("✅ Post scheduler started.");
  };