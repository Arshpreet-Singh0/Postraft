// apps/web/src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const authOptions = {
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
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log(account);
        
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
        console.log(session);
        
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      return session;
    },
  },
};

// ✅ Export handlers for GET and POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
