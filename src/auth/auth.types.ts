import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'

@ObjectType()
export class AuthResponse {
	@Field(() => User)
	user?: User

	@Field()
	accessToken?: String

	@Field()
	refreshToken?: String
}
