import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class RefreshJwtGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) throw new UnauthorizedException('Пользователь не авторизован')
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.REFRESH_TOKEN
			})
			request['user'] = payload
		} catch {
			throw new UnauthorizedException('Пользователь не авторизован')
		}

		return true
	}

	private extractTokenFromHeader(request: Request) {
		const authorizationHeader = request.headers.authorization
		if (authorizationHeader) {
			const [type, token] = authorizationHeader.split(' ')
			if (type === 'Refresh') {
				return token
			}
		}
		return undefined
	}
}
