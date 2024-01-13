-- CreateTable
CREATE TABLE "_likedTracks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedTracks_AB_unique" ON "_likedTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_likedTracks_B_index" ON "_likedTracks"("B");

-- AddForeignKey
ALTER TABLE "_likedTracks" ADD CONSTRAINT "_likedTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedTracks" ADD CONSTRAINT "_likedTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
