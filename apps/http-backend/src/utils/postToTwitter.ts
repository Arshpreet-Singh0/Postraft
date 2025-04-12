import { prisma } from "@repo/db/client";
import axios from "axios";
import qs from "qs";

/**
 * Posts a tweet to Twitter for the given user and updates the DB accordingly.
 */
export const postToTwitter = async (
  text: string,
  twitterId: string,
  clerkId: string,
  postId: number
): Promise<boolean> => {
  try {
    const twitterAccount = await prisma.twitterAccount.findFirst({
      where: { clerkUserId: clerkId, twitterId },
    });

    if (!twitterAccount) {
      console.warn("❌ Twitter account not found for user:", clerkId);
      return false;
    }

    const postSuccess = await tryPostTweet(text, twitterAccount.accessToken);

    if (postSuccess) {
      await markPostAsPublished(postId);
      return true;
    }

    // Handle expired/invalid token case
    if (twitterAccount.refreshToken) {
      const newAccessToken = await refreshTwitterToken(twitterAccount.refreshToken, clerkId);
      const retrySuccess = await tryPostTweet(text, newAccessToken);

      if (retrySuccess) {
        await markPostAsPublished(postId);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("❌ Failed to post tweet:", error);
    return false;
  }
};

const tryPostTweet = async (text: string, accessToken: string): Promise<boolean> => {
  try {
    await axios.post(
      "https://api.twitter.com/2/tweets",
      { text },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.warn("🔁 Access token might be expired.");
      return false;
    }
    console.error("❌ Twitter post error:", error.response?.data || error.message);
    throw error;
  }
};

const markPostAsPublished = async (postId: number) => {
  await prisma.scheduledPost.update({
    where: { id: postId },
    data: { status: "published" },
  });
};

/**
 * Refreshes Twitter OAuth2 token and updates it in the DB.
 */
const refreshTwitterToken = async (refreshToken: string, clerkUserId: string): Promise<string> => {
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

    await prisma.twitterAccount.updateMany({
      where: { clerkUserId },
      data: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_in,
      },
    });

    console.log("🔁 Twitter access token refreshed.");
    return access_token;
  } catch (err: any) {
    console.error("❌ Token refresh failed:", err.response?.data || err.message);
    throw new Error("Refresh token expired or invalid. Re-authentication required.");
  }
};
