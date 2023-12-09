import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
	async canActivate(context: ExecutionContext) {
		const activate = (await super.canActivate(context)) as boolean
		const ctx = GqlExecutionContext.create(context).getContext()
		const request = ctx.req

		if (!request.headers.authorization) {
			return false
		}

		await super.logIn(request)
		return activate
	}
}
