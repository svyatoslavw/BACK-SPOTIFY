import { Prisma } from '@prisma/client'
import { returnPlaylistObject } from 'src/playlist/playlist.object'

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	createdAt: true,
	email: true,
	name: true,
	login: true,
	country: true,
	image: true,
	role: true,
	password: false,
	playlist: {
		select: returnPlaylistObject
	}
}
