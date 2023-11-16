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
import { AuthDto, AuthGoogleDto } from './dto/auth.dto'

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

		const tokens = await this.issueTokens(user.id)

		return { user: this.returnUserFields(user), ...tokens }
	}

	async register(ip: string, dto: AuthDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) throw new BadRequestException('Пользователь уже существует')

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

	async authGoogle(dto: AuthGoogleDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (oldUser) {
			return oldUser
		}
		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: dto.name,
				password: '',
				country: 'Unknown',
				login: generateRandomLogin(24)
			}
		})

		return {
			user: this.returnUserFields(user)
		}
	}

	async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwtServise.sign(data, {
			expiresIn: '1d'
		})

		const refreshToken = this.jwtServise.sign(data, {
			expiresIn: '7d'
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
		if (!user) throw new NotFoundException('Пользователь не найден!')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}
}
