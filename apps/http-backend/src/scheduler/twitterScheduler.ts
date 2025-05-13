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
          // status: "pending",
        },
      });

      console.log("Due posts:", duePosts);
      
      
      const promises = duePosts.map((post) => {
        return postToTwitter(post.content, post.twitterAccountId, post.clerkUserId, post.id);
      });
      console.log(promises);
      
      const res = await Promise.all(promises);
      console.log(res);
      
      // for (const post of duePosts) {
      //   console.log(post);
        
      //   await postToTwitter(post.content, post.twitterAccountId, post.clerkUserId, post.id);
      // }
    });
  
    console.log("✅ Post scheduler started.");
  };