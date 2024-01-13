import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { returnPlaylistObject } from 'src/playlist/playlist.object'
import { PrismaService } from 'src/prisma.service'
import { returnTrackObject } from '../track/track.object'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService
	) {}

	async getAll() {
		return this.prisma.user.findMany()
	}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				email: true,
				password: false,
				name: true,
				createdAt: true,
				image: true,
				login: true,
				country: true,
				gender: true,
				role: true,
				premium: true,
				tracks: true,
				likedTracks: {
					select: returnTrackObject
				},
				playlist: {
					select: returnPlaylistObject
				},
				albums: true,
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
		return this.prisma.user.findUnique({
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
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}

	async updateImage(id: number, dto: UserDto) {
		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				image: dto.image
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

	async toggleFavoriteTrack(userId: number, trackId: number) {
		const user = await this.byId(userId)

		if (!user) throw new NotFoundException('Пользователь не найден')

		const isExists = user.likedTracks.some(track => track.id === trackId)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				likedTracks: {
					[isExists ? 'disconnect' : 'connect']: {
						id: trackId
					}
				}
			}
		})
		return 'Success'
	}
	async getProfileByToken(token: string) {
		try {
			const payload: any = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET
			})
			const userId = +payload.id
			if (!userId) {
				throw new Error('Invalid user id')
			}

			return this.prisma.user.findUnique({
				where: {
					id: +userId
				}
			})
		} catch (error) {
			throw new Error('Invalid token')
		}
	}
	remove(id: number) {
		return this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
