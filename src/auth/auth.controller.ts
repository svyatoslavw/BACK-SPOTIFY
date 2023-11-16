import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { refreshTokenDto } from './dto/refresh-token.dto'
import { GithubGuard } from './guards/github.guard'
import { GoogleGuard } from './guards/google.guard'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private userService: UserService,
		private jwtServise: JwtService
	) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Req() req: Request, @Body() dto: AuthDto) {
		return this.authService.register(req.ip, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: refreshTokenDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}

	@UseGuards(GoogleGuard)
	@Get('google/login')
	async googleLogin(@Req() req: Request, @Res() res: Response) {
		return { message: 'Google Auth' }
	}

	@UseGuards(GithubGuard)
	@Get('github/login')
	async facebookLogin(@Req() req: Request, @Res() res: Response) {
		return { message: 'Github Auth' }
	}

	@UseGuards(GoogleGuard)
	@Get('google/redirect')
	async googleRedirect(@Req() req: Request, @Res() res: Response) {
		const user = req.user
		const accessToken = this.jwtServise.sign(user, {
			expiresIn: '1d'
		})

		const refreshToken = this.jwtServise.sign(user, {
			expiresIn: '7d'
		})
		res.cookie('accessToken', accessToken)
		res.cookie('refreshToken', refreshToken)

		res.redirect('http://localhost:3000')
	}
	@UseGuards(GithubGuard)
	@Get('github/redirect')
	async facebookRedirect(@Req() req: Request, @Res() res: Response) {
		const user = req.user
		const accessToken = this.jwtServise.sign(user, {
			expiresIn: '1d'
		})

		const refreshToken = this.jwtServise.sign(user, {
			expiresIn: '7d'
		})
		res.cookie('accessToken', accessToken)
		res.cookie('refreshToken', refreshToken)

		res.redirect('http://localhost:3000')
	}
}
