import { Prisma } from '@prisma/client'
import { returnTrackObject } from 'src/track/track.object'

export const returnPlaylistObject: Prisma.PlaylistSelect = {
	id: true,
	createdAt: true,
	slug: true,
	name: true,
	image: true,
	tracks: {
		select: returnTrackObject
	},
	userId: true,
	user: true
}
