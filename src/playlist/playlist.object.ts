import { Prisma } from '@prisma/client'
import { returnTrackObject } from 'src/track/track.object'
import { returnUserObject } from 'src/user/user.object'

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
	user: {
		select: returnUserObject
	}
}
