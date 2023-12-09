import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<UserRoleType[]>(
			'roles',
			context.getHandler()
		)

		if (!roles) {
			return true
		}

		const gqlContext = GqlExecutionContext.create(context)
		const { user } = gqlContext.getContext().req

		if (!user || !roles.includes(user.role)) {
			throw new ForbiddenException(`Вы не ${user.role}`)
		}

		return true
	}
}
