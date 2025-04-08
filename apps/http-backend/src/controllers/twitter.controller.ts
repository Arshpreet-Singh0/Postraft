import { prisma } from "@repo/db/client";
import { NextFunction, Request, Response } from "express";
import { saveTwitterCredentialsSchema } from "../validations/twitterValidations";
import ExpressError from "../utils/errorHandler";

export const saveTwitterCredentials = async(req : Request, res:Response, next:NextFunction) : Promise<void> => {
    try {
        console.log(req.body);
        
        const parsedData = saveTwitterCredentialsSchema.safeParse(req.body);
        
        
        if(!parsedData.success){
            const errors = parsedData.error.errors.map((err) => err.message);
            console.log(errors);
            
            throw new ExpressError(errors?.[0] || "All fields are rquired   ", 400);
        }
        console.log(parsedData.data.accessToken);
        const {
            twitterId,
            username,
            name,
            profileImage,
            accessToken,
            refreshToken,
            expiresAt,
          } = parsedData.data;

            const existing = await prisma.twitterAccount.upsert({
              where: { twitterId },
              update: {
                username,
                name,
                profileImage,
                accessToken,
                refreshToken,
                expiresAt : Number(expiresAt),
              },
              create: {
                twitterId,
                username,
                name,
                profileImage,
                accessToken,
                refreshToken,
                expiresAt : Number(expiresAt),
              },
            });

            res.status(200).json({ message: "Saved successfully", account: existing });
        
    } catch (error) {
        next(error);
    }
}