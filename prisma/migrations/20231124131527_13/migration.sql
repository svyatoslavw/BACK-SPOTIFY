/*
  Warnings:

  - You are about to drop the column `isPremium` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EnumUserPremium" AS ENUM ('NONEPREMIUM', 'INDIVIDUAL', 'STUDENT', 'DUO', 'FAMILY');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPremium";

-- CreateTable
CREATE TABLE "Premium" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "EnumUserPremium" NOT NULL,

    CONSTRAINT "Premium_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "Premium_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
