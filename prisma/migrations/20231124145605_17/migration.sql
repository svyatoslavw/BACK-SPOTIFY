/*
  Warnings:

  - You are about to drop the column `image` on the `Order` table. All the data in the column will be lost.
  - Added the required column `price` to the `Premium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Premium" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '/uploads/icon.png',
ADD COLUMN     "price" INTEGER NOT NULL;
