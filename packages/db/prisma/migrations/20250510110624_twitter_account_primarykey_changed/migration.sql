/*
  Warnings:

  - The primary key for the `TwitterAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ScheduledPost" DROP CONSTRAINT "ScheduledPost_twitterAccountId_fkey";

-- DropIndex
DROP INDEX "TwitterAccount_twitterId_key";

-- AlterTable
ALTER TABLE "TwitterAccount" DROP CONSTRAINT "TwitterAccount_pkey",
ADD CONSTRAINT "TwitterAccount_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ScheduledPost" ADD CONSTRAINT "ScheduledPost_twitterAccountId_fkey" FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
