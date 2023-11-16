/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_slug_key" ON "Playlist"("slug");
