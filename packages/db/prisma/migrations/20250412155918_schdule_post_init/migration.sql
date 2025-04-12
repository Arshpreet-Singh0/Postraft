-- DropForeignKey
ALTER TABLE "ScheduledPost" DROP CONSTRAINT "ScheduledPost_twitterAccountId_fkey";

-- DropIndex
DROP INDEX "ScheduledPost_clerkUserId_key";
