-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_premiumId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "premiumId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_premiumId_fkey" FOREIGN KEY ("premiumId") REFERENCES "Premium"("id") ON DELETE SET NULL ON UPDATE CASCADE;
