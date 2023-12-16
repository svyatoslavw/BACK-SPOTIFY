import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { EnumUserPremium } from '@prisma/client'
import { User } from 'src/user/entities/user.entity'

registerEnumType(EnumUserPremium, { name: 'EnumUserPremium' })

@ObjectType()
export class Premium {
	@Field(() => Int)
	id: number

	@Field(() => String)
	createdAt: string

	@Field(() => String, { nullable: true })
	expiration: string

	@Field(() => String)
	price: Number

	@Field(() => EnumUserPremium)
	type: EnumUserPremium

	@Field(() => String)
	image: string

	@Field(() => Number)
	userId: true

	@Field(() => User)
	user: User
}
