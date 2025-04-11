import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    user: {
      name?: string;
      image?: string;
      twitter_id?: string;
      username?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    twitter_id?: string;
    username?: string;
    name?: string;
    profile_image?: string;
  }
}
