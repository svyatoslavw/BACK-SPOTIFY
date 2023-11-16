/*
  Warnings:

  - You are about to drop the `_ArtistToTrack` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artist_id` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToTrack" DROP CONSTRAINT "_ArtistToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToTrack" DROP CONSTRAINT "_ArtistToTrack_B_fkey";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "artist_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ArtistToTrack";

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
