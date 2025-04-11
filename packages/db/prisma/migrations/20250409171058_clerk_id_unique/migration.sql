/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId]` on the table `TwitterAccount` will be added. If there are existing duplicate values, this will fail.
  - Made the column `clerkUserId` on table `TwitterAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TwitterAccount" ALTER COLUMN "clerkUserId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccount_clerkUserId_key" ON "TwitterAccount"("clerkUserId");
