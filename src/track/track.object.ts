import { Prisma } from '@prisma/client'

export const returnTrackObject: Prisma.TrackSelect = {
	id: true,
	createdAt: true,
	releaseDate: true,
	file: true,
	name: true,
	image: true,
	artistId: true,
	artist: {
		select: {
			id: true,
			image: true,
			name: true
		}
	},
	album: true,
	albumId: true
}
