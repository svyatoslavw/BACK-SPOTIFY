/*
  Warnings:

  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_artist_id_fkey";

-- DropTable
DROP TABLE "Artist";

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
