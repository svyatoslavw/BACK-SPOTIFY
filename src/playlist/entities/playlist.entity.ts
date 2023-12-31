import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Track } from 'src/track/entities/track.entity'
import { User } from 'src/user/entities/user.entity'

@ObjectType()
export class Playlist {
	@Field(() => Int)
	id: number

	@Field(() => String)
	createdAt: string

	@Field(() => String!)
	slug: string

	@Field(() => String)
	name: string

	@Field(() => String)
	image: string

	@Field(() => [Track], { nullable: true })
	tracks: Track[]

	@Field(() => Number)
	userId: number

	@Field(() => User, { nullable: true })
	user: User
}
