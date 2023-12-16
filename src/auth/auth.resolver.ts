import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResponse } from './auth.types'
import { AuthDto } from './dto/auth.dto'
import { TokensDto } from './dto/tokens.dto'
import { Auth } from './entities/auth.entity'
//import { GithubGuard } from './guards/github.guard'
//import { GoogleGuard } from './guards/google.guard'

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

	@Mutation(() => AuthResponse, { name: 'getTokens' })
	getNewTokens(@Args('authInput') dto: TokensDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}

	//@UseGuards(GoogleGuard)
	// @Query(() => AuthResponse)
	// googleLogin(@Context() context: any) {
	// 	const { user } = context.req
	// 	console.log(user)
	// }

	// //@UseGuards(GithubGuard)
	// @Mutation(() => AuthResponse)
	// githubLogin(@Context('req') req: Request, @Context('res') res: Response) {
	// 	return { message: 'Github Authorization' }
	// }

	// @Query(() => AuthResponse)
	// googleRedirect(@Context('req') req: Request, @Context('res') res: Response) {
	// 	return this.authService.socialRedirect(req, res)
	// }

	// @Mutation(() => AuthResponse)
	// githubRedirect(@Context('req') req: Request, @Context('res') res: Response) {
	// 	return this.authService.socialRedirect(req, res)
	// }

	// @Query(() => [Auth], { name: 'auth' })
	// findAll() {
	//   return this.authService.findAll();
	// }

	// @Query(() => Auth, { name: 'auth' })
	// findOne(@Args('id', { type: () => Int }) id: number) {
	//   return this.authService.findOne(id);
	// }

	// @Mutation(() => Auth)
	// updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
	//   return this.authService.update(updateAuthInput.id, updateAuthInput);
	// }

	// @Mutation(() => Auth)
	// removeAuth(@Args('id', { type: () => Int }) id: number) {
	//   return this.authService.remove(id);
	// }
}
