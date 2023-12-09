import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Album } from 'src/album/entities/album.entity'
import { Track } from 'src/track/entities/track.entity'

@ObjectType()
export class Category {
	@Field(() => Int)
	exampleField: number

	id: number
	@Field(() => String)
	createdAt: string

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => [Track])
	tracks: Track[]

	@Field(() => [Album])
	albums: Album[]
}
