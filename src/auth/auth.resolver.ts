import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResponse } from './decorators/entities/auth.response'
import { AuthDto } from './dto/auth.dto'
import { Auth } from './entities/auth.entity'

@Resolver(() => Auth)
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => AuthResponse, { name: 'register' })
	register(@Args('registerInput') dto: AuthDto) {
		return this.authService.register(dto)
	}

	@Mutation(() => AuthResponse, { name: 'login' })
	login(@Args('loginInput') dto: AuthDto) {
		return this.authService.login(dto)
	}

	@Mutation(() => AuthResponse, { name: 'getNewTokens' })
	getNewTokens(@Args('refreshToken') refreshToken: string) {
		return this.authService.getNewTokens(refreshToken)
	}
}
