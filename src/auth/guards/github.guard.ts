// @Injectable()
// export class GithubGuard extends AuthGuard('github') {
// 	async canActivate(context: ExecutionContext) {
// 		const activate = (await super.canActivate(context)) as boolean
// 		const request = context.switchToHttp().getRequest()

// 		await super.logIn(request)
// 		return activate
// 	}
// }
