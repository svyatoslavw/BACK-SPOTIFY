import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { generateSlug } from 'src/utils/generate-slug'
import { generateRandomNumber } from 'src/utils/random-number'
import { returnPlaylistObject } from './playlist.object'

@Injectable()
export class PlaylistService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async getAll() {
		return this.prisma.playlist.findMany({
			select: returnPlaylistObject
		})
	}

	async byId(id: number) {
		const playlist = await this.prisma.playlist.findUnique({
			where: {
				id
			},
			select: returnPlaylistObject
		})
		if (!playlist) throw new NotFoundException('Playlist not found')

		return playlist
	}

	async bySlug(slug: string) {
		const playlist = await this.prisma.playlist.findUnique({
			where: {
				slug
			},
			select: returnPlaylistObject
		})
		if (!playlist) throw new NotFoundException('Playlist not found')

		return playlist
	}

	async create(userId: number) {
		const user = await this.userService.byId(userId)

		const playlistName = `My playlist #${generateRandomNumber(10)}`
		const playlist = await this.prisma.playlist.create({
			data: {
				name: playlistName,
				slug: generateSlug(playlistName),
				user: {
					connect: { id: user.id }
				},
				image: '/uploads/playlist.png'
			}
		})

		if (!playlist) {
			throw new NotFoundException('Playlist creation failed')
		}

		const favorite = await this.prisma.favorite.create({
			data: {
				userId: user.id,
				playlistId: playlist.id
			}
		})

		if (!favorite) {
			throw new NotFoundException('Failed to add playlist to favorites')
		}

		return playlist
	}

	async delete(userId: number, playlistId: number) {
		const user = await this.userService.byId(userId)
		const playlist = await this.byId(playlistId)

		const favoritePlaylist = await this.prisma.favorite.deleteMany({
			where: {
				playlist: {
					id: playlist.id
				},
				user: {
					id: user.id
				}
			}
		})

		if (!favoritePlaylist) {
			throw new NotFoundException('Failed to remove playlist from favorites')
		}

		const removedPlaylist = await this.prisma.playlist.delete({
			where: {
				id: playlist.id
			}
		})

		if (!removedPlaylist) {
			throw new NotFoundException('Failed to delete playlist')
		}

		return { favoritePlaylist, removedPlaylist }
	}
}
