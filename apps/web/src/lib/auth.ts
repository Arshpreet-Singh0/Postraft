import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { BACKEND_URL } from "@/config/config";
const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          scope: "tweet.read tweet.write users.read offline.access",
        },
      },
      profile(profile) {
        console.log("profile : ", profile);
        return {
          id: profile.data.id,
          name: profile.data.name,
          email: null,
          image: profile.data.profile_image_url,
          username: profile.data.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: any;
      profile?: any;
    }) {
      if (account && profile) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at =
          Math.floor(Date.now() / 1000) + (account.expires_in ?? 3600);
        token.twitter_id = profile.data?.id;
        token.username = profile.data?.username;
        token.name = profile.data?.name;
        token.profile_image = profile.data?.profile_image_url;


        const urlParams = new URLSearchParams(account?.callbackUrl?.split("?")[1]);
        console.log("account.callbackUrl : ", account?.callbackUrl);
        
        const clerkToken = urlParams.get("clerkToken");

        console.log("clerkToken : ", clerkToken);
   

        console.log("Saving Twitter credentials to backend...");

        try {
          // You must send Clerk token from client & save it in your API call
          const res = await fetch("http://localhost:8080/api/v1/save-twitter-credentials", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization : `Bearer ${clerkToken}`
  
            },
            body: JSON.stringify({
              twitterId: profile.data?.id,
              username: profile.data?.username,
              name: profile.data?.name,
              profileImage: profile.data?.profile_image_url,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              expiresAt:
                Math.floor(Date.now() / 1000) + (account.expires_in ?? 3600),
            }),
          });

          console.log(res);
          
        } catch (error) {
          console.error("❌ Failed to save Twitter credentials:", error);
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.expires_at = token.expires_at;
      session.user.twitter_id = token.twitter_id;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.image = token.profile_image;
      return session;
    },
  },
};

export default authOptions;
