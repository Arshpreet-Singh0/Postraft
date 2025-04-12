/*
  Warnings:

  - Added the required column `twitterAccountId` to the `ScheduledPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduledPost" ADD COLUMN     "twitterAccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ScheduledPost" ADD CONSTRAINT "ScheduledPost_twitterAccountId_fkey" FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
