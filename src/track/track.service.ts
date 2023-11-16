import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnTrackObject } from './track.object'

@Injectable()
export class TrackService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.track.findMany({
			select: returnTrackObject
		})
	}

	async byId(id: number) {
		const track = await this.prisma.track.findFirst({
			where: {
				id
			},
			select: returnTrackObject
		})
		if (!track) throw new NotFoundException('Track not found')

		return track
	}
}
