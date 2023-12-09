import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'

@ObjectType()
export class RegisterResponse {
	@Field(() => User)
	user?: User

	@Field()
	accessToken?: String

	@Field()
	refreshToken?: String
}

@ObjectType()
export class LoginResponse {
	@Field(() => User)
	user: User

	@Field()
	accessToken?: String

	@Field()
	refreshToken?: String
}
