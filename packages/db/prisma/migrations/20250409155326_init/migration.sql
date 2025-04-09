-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twitterAccountId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("clerkUserId")
);

-- CreateTable
CREATE TABLE "TwitterAccount" (
    "id" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "profileImage" TEXT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "TwitterAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterAuthSession" (
    "id" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "clerkUserId" TEXT NOT NULL,

    CONSTRAINT "TwitterAuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccount_twitterId_key" ON "TwitterAccount"("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAuthSession_clerkUserId_key" ON "TwitterAuthSession"("clerkUserId");
