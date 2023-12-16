import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { Playlist } from './playlist.entity'

@ObjectType()
export class Favorite {
	@Field(() => Int)
	id: number

	@Field(() => String)
	createdAt: string

	@Field(() => Int)
	userId: number

	@Field(() => Int)
	playlistId: number

	@Field(() => User)
	user: User

	@Field(() => Playlist)
	playlist: Playlist
}
