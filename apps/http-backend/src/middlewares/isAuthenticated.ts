import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { clerkClient } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request {
      clerkToken?: string;
      userId?: string;
      clerkId?: string;
      user?: {
        email: string;
      };
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract token from query, header, or cookies
    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const tokenFromQuery = queryParams.get("token");
    const tokenFromHeader = req.headers.authorization?.replace("Bearer ", "");
    const tokenFromCookie = req.cookies?.clerkToken;

    const token = tokenFromQuery || tokenFromHeader || tokenFromCookie || "";

    console.log("Received Clerk token:", token);

    const publicKey = process.env.CLERK_JWT_PUBLIC_KEY;
    if (!publicKey) {
      console.error("Missing CLERK_JWT_PUBLIC_KEY");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const formattedKey = publicKey.replace(/\\n/g, "\n");

    const decoded = jwt.verify(token, formattedKey, {
      algorithms: ["RS256"],
      issuer: process.env.CLERK_ISSUER || "https://clerk.example.com", // Update as needed
    }) as jwt.JwtPayload;

    console.log("Decoded JWT:", decoded);

    const userId = decoded.sub;

    if (!userId) {
      res.status(403).json({ message: "Invalid token payload: Missing sub" });
      return;
    }

    // Fetch Clerk user details
    const user = await clerkClient.users.getUser(userId);
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );

    if (!primaryEmail) {
      res.status(400).json({ message: "User email not found" });
      return;
    }

    // Attach values to request object
    req.clerkToken = token;
    req.userId = userId;
    req.clerkId = userId;
    req.user = {
      email: primaryEmail.emailAddress,
    };

    next();
  } catch (error) {
    console.error("Authentication Error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        message: "Invalid or expired token",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
      return;
    }

    res.status(500).json({
      message: "Internal auth processing error",
      details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
    });
  }
}
