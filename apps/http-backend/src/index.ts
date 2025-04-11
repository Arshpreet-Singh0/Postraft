// apps/api/src/server.ts
import express, { NextFunction, Request, Response } from 'express';
import { getAuth, requireAuth } from '@clerk/express';
import { prisma } from '@repo/db/client';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'

dotenv.config();

import twitterRouter from "./routes/twitter.route";
import contentRouter from "./routes/content.route";

const app = express();
const PORT = process.env.PORT || 8080;

//cors
app.use(cors({
    origin : process.env.ALLOWED_CLIENTS?.split(",").map((origin)=> origin.trim()) || ["http://localhost:3000"],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}));


app.use(express.json());

//api's
app.use('/api/v1', twitterRouter);
app.use('/api/v1', contentRouter);

app.post('/' ,(req, res)=>{
  console.log("/////");
  res.json("fefg");
  
})

// app.get('/api/me', requireAuth(), async (req: Request, res: Response) => {
//   const { userId } = getAuth(req);
//   if (!userId) {
//     res.status(401).json({ error: 'Unauthorized' });
//     return;
//   }
//   console.log(userId);
  

//   let user = await prisma.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) {
//     const clerkRes = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       },
//     });
//     const clerkUser = await clerkRes.json();
//     console.log(clerkUser);
    

//     user = await prisma.user.create({
//       data: {
//         clerkUserId: userId,
//         email: clerkUser.email_addresses[0].email_address,
//         name: `${clerkUser.first_name} ${clerkUser.last_name}`,
//         image: clerkUser.image_url,
//       },
//     });
//   }

//   console.log(user);
  

//   res.json({ user });
// });

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
