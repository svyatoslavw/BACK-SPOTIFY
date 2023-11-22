/*
  Warnings:

  - You are about to drop the column `premium_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserPremium` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_premium_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "premium_id",
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "UserPremium";
