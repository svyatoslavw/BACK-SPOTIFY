import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'
import { Favorite } from 'src/playlist/entities/favorites.entity'
import { Premium } from 'src/premium/entities/premium.entity'

registerEnumType(UserRole, { name: 'UserRole' })

@ObjectType()
export class User {
	@Field(() => Int)
	id: number

	@Field(() => String)
	createdAt: string

	@Field(() => String)
	email: string

	@Field(() => String)
	password: string

	@Field(() => String)
	name: string

	@Field(() => String)
	image: string

	@Field(() => String, { nullable: true })
	country: string

	@Field(() => String)
	login: string

	@Field(() => [Favorite], { nullable: true })
	favorites?: Favorite[]

	@Field(() => UserRole)
	role: UserRole

	@Field(() => Premium, { nullable: true })
	premium: Premium
}
