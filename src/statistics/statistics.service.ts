import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class StatisticsService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async getMainStatistics() {
		const usersCount = await this.prisma.user.count()
		const tracksCount = await this.prisma.track.count()
		const albumsCount = await this.prisma.album.count()
		const playlistCount = await this.prisma.playlist.count()
		const premiumCount = await this.prisma.premium.count()
		const totalAmount = await this.prisma.order.aggregate({
			_sum: {
				price: true
			}
		})

		return [
			{
				name: 'Users',
				value: usersCount
			},
			{
				name: 'Tracks',
				value: tracksCount
			},
			{
				name: 'Albums',
				value: albumsCount
			},
			{
				name: 'Playlists',
				value: playlistCount
			},
			{
				name: 'Premiums',
				value: premiumCount
			},
			{
				name: 'Total amount',
				value: totalAmount._sum.price
			}
		]
	}
}
