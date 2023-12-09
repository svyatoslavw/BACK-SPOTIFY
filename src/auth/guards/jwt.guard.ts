import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

// -------------------------------------------------
// --------------------REST API---------------------
// export class JwtGuard extends AuthGuard('jwt') {}
// -------------------------------------------------

export class JwtGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext): any {
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req
	}
}
