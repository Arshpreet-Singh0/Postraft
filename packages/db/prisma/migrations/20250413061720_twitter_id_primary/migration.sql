/*
  Warnings:

  - The primary key for the `TwitterAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[twitterId]` on the table `TwitterAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ScheduledPost" DROP CONSTRAINT "ScheduledPost_twitterAccountId_fkey";

-- AlterTable
ALTER TABLE "TwitterAccount" DROP CONSTRAINT "TwitterAccount_pkey",
ADD CONSTRAINT "TwitterAccount_pkey" PRIMARY KEY ("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccount_twitterId_key" ON "TwitterAccount"("twitterId");

-- AddForeignKey
ALTER TABLE "ScheduledPost" ADD CONSTRAINT "ScheduledPost_twitterAccountId_fkey" FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("twitterId") ON DELETE RESTRICT ON UPDATE CASCADE;
