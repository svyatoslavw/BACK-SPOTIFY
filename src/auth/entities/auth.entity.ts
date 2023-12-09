import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auth {
	@Field(() => String)
	email: string

	@Field(() => String)
	name: string

	@Field(() => String, { nullable: true })
	password: string
}
