import {z} from 'zod';

export const saveTwitterCredentialsSchema = z.object({
    twitterId : z.string({message : "Twitter ID is required"}).min(1),
    username : z.string({message : "Username is required"}).min(1),
    name : z.string({message : "Name is required"}).min(1),
    profileImage : z.string({message : "Profile Image is required"}).min(1),
    accessToken : z.string({message : "Access Token is required"}).min(1),
    refreshToken : z.string({message : "Refresh Token is required"}).min(1),
    expiresAt : z.number({message : "Expires At is required"}).transform((val) => {
        return new Date(val);
    }),
})