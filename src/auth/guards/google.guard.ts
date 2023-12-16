// @Injectable()
// export class GoogleGuard extends AuthGuard('google') {
// 	async canActivate(context: ExecutionContext) {
// 		const activate = (await super.canActivate(context)) as boolean
// 		const ctx = GqlExecutionContext.create(context).getContext()
// 		const request = ctx.getContext().req

// 		await super.logIn(request)
// 		return activate
// 	}
// }
