import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { UserService } from 'src/user/user.service'

export class SessionSerializer extends PassportSerializer {
	constructor(private userService: UserService) {
		super()
	}
	serializeUser(user: User, done: Function) {
		done(null, user)
	}

	async deserializeUser(payload: any, done: Function) {
		const user = await this.userService.byId(payload.id)
		console.log(user)
		return user ? done(null, user) : done(null, null)
	}
}
