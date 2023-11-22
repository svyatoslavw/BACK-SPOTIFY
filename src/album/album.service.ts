import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { SearchDto } from 'src/search/dto/search.dto'
import { returnAlbumObject } from './album.object'

@Injectable()
export class AlbumService {
	constructor(private prisma: PrismaService) {}

	async getAll(dto: SearchDto = {}) {
		const filters = this.createAlbumFilter(dto)

		const album = await this.prisma.album.findMany({
			select: returnAlbumObject,
			orderBy: {
				createdAt: 'desc'
			},
			where: filters
		})

		return album
	}

	private getCategoryFilter(categoryId: number): Prisma.AlbumWhereInput {
		return {
			categoryId
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.AlbumWhereInput {
		return {
			OR: [
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{}
			]
		}
	}

	private createAlbumFilter(dto: SearchDto): Prisma.AlbumWhereInput {
		const filters: Prisma.AlbumWhereInput[] = []

		if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))
		if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId))

		return filters.length ? { AND: filters } : {}
	}
}
