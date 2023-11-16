import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'
import { returnUserObject } from './user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: returnUserObject
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
				password: dto.password ? await hash(dto.password, 10) : user.password
			}
		})
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
