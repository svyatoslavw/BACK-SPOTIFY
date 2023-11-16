import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { JwtGuard } from '../guards/jwt.guard'
import { RolesGuard } from '../guards/roles.guard'

export const Auth = (...roles: UserRoleType[]) => {
	const finalRoles = roles.includes('USER') ? roles : ['USER']
	const guards = finalRoles.includes('USER')
		? [JwtGuard]
		: [JwtGuard, RolesGuard]

	return applyDecorators(SetMetadata('roles', finalRoles), UseGuards(...guards))
}
