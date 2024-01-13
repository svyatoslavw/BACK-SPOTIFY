import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { AlbumService } from 'src/album/album.service'
import { PrismaService } from 'src/prisma.service'
import { SearchDto } from 'src/search/dto/search.dto'
import { returnTrackObject } from './track.object'
import { UserService } from '../user/user.service'
import { TrackDto } from './dto/track.dto'
import { generateSlug } from '../utils/generate-slug'

@Injectable()
export class TrackService {
	constructor(
		private prisma: PrismaService,
		private albumService: AlbumService,
		private userService: UserService
	) {}

	async getAll(dto: SearchDto = {}) {
		const filters = this.createFilter(dto)

		const track = await this.prisma.track.findMany({
			select: returnTrackObject,
			orderBy: {
				createdAt: 'desc'
			},
			where: filters
		})

		return track
	}

	private getCategoryFilter(categoryId: number): Prisma.TrackWhereInput {
		return {
			categoryId
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.TrackWhereInput {
		return {
			OR: [
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					artist: {
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				}
			]
		}
	}

	private createFilter(dto: SearchDto): Prisma.TrackWhereInput {
		const filters: Prisma.TrackWhereInput[] = []

		if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))
		if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId))

		return filters.length ? { AND: filters } : {}
	}

	async getHome() {
		return this.prisma.track.findMany({
			select: returnTrackObject,
			orderBy: {
				createdAt: 'desc'
			},
			take: 8
		})
	}

	async byId(id: number) {
		const track = await this.prisma.track.findUnique({
			where: {
				id: id
			},
			select: returnTrackObject
		})
		if (!track) throw new NotFoundException('Track not found')

		return track
	}

	async bySlug(slug: string) {
		const track = await this.prisma.track.findUnique({
			where: {
				slug
			},
			select: returnTrackObject
		})
		if (!track) throw new NotFoundException('Track not found')

		return track
	}

	async create(id: number, dto: TrackDto) {
		const user = await this.userService.byId(id)
		return this.prisma.track.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
				image: dto.image,
				file: dto.file,
				releaseDate: new Date(),
				artist: {
					connect: {
						id: user.id
					}
				}
			}
		})
	}
}
