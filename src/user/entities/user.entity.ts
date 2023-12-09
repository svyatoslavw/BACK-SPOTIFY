import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'
import { Playlist } from 'src/playlist/entities/playlist.entity'

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

	@Field(() => String)
	country: string

	@Field(() => String)
	login: string

	@Field(() => [Playlist], { nullable: true })
	favorites?: Playlist[]

	@Field(() => UserRole)
	role: UserRole
}
