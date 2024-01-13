import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { JwtGuard } from '../guards/jwt.guard'
import { RolesGuard } from '../guards/roles.guard'

export const Auth = (...roles: UserRoleType[]) => {
	const result = roles.includes('USER') ? roles : ['USER']
	const guards = result.includes('USER') ? [JwtGuard] : [JwtGuard, RolesGuard]

	return applyDecorators(SetMetadata('roles', result), UseGuards(...guards))
}
