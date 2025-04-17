/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `TwitterAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TwitterAccount" DROP COLUMN "expiresAt",
ADD COLUMN     "accessTokenExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refreshTokenExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
