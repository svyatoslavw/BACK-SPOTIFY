import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { generateRandomLogin } from 'src/utils/random-login'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
		private jwtServise: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)

		return { user: this.returnUserFields(user), ...tokens }
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwtServise.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.userService.byId(result.id)
		if (!user) throw new NotFoundException('User not found ')

		const tokens = await this.issueTokens(user.id)

		return { user: this.returnUserFields(user), ...tokens }
	}

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: dto.name,
				password: await hash(dto.password),
				country: 'Unknown',
				login: generateRandomLogin(24)
			}
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwtServise.sign(data, {
			expiresIn: '12h'
		})

		const refreshToken = this.jwtServise.sign(data, {
			expiresIn: '1d'
		})

		return { accessToken, refreshToken }
	}

	private returnUserFields(user: Partial<User>) {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			image: user.image
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (!user) throw new NotFoundException('User not found!')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}
}
