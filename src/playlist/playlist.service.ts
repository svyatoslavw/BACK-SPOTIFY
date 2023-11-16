import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnPlaylistObject } from './playlist.object'

@Injectable()
export class PlaylistService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.playlist.findMany({
			select: returnPlaylistObject
		})
	}

	async byId(id: number) {
		const playlist = await this.prisma.playlist.findFirst({
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
}
