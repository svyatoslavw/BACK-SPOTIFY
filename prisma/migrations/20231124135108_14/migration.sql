/*
  Warnings:

  - Added the required column `premiumId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Premium" DROP CONSTRAINT "Premium_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "premiumId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_premiumId_fkey" FOREIGN KEY ("premiumId") REFERENCES "Premium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
