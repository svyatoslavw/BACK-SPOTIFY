import { Prisma } from '@prisma/client'

export const returnAlbumObject: Prisma.AlbumSelect = {
	id: true,
	createdAt: true,
	releaseDate: true,
	name: true,
	image: true,
	tracks: {
		select: {
			id: true,
			createdAt: true,
			name: true,
			image: true,
			file: true,
			releaseDate: true,
			category: true,
			categoryId: true,
			artist: true,
			artistId: true
		}
	},
	category: true,
	categoryId: true
}
