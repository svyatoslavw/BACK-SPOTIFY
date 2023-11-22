import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { returnPlaylistObject } from 'src/playlist/playlist.object'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				image: true,
				login: true,
				country: true,
				gender: true,
				role: true,
				tracks: true,
				isPremium: true,
				favorites: {
					select: {
						id: true,
						createdAt: true,
						playlistId: true,
						playlist: {
							select: returnPlaylistObject
						},
						user: true,
						userId: true
					}
				},
				...selectObject
			}
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Этот Email уже используется')

		const user = await this.byId(id)

		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: dto.email,
				name: dto.name,
				image: dto.image,
				password: dto.password ? await hash(dto.password, 10) : user.password
			}
		})
	}

	async toggleFavorite(userId: number, playlistId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				favorites: {
					select: {
						id: true,
						playlist: {
							select: returnPlaylistObject
						},
						createdAt: true,
						user: true,
						userId: true,
						playlistId: true
					}
				}
			}
		})

		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}

		const isFavorite = user.favorites.some(
			favorite => favorite.playlistId === playlistId
		)

		if (isFavorite) {
			await this.prisma.favorite.deleteMany({
				where: {
					userId,
					playlistId
				}
			})
		} else {
			await this.prisma.favorite.create({
				data: {
					userId,
					playlistId
				}
			})
		}

		return 'Success'
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
