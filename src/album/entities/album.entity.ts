import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Category } from 'src/category/entities/category.entity'
import { Track } from 'src/track/entities/track.entity'

@ObjectType()
export class Album {
	@Field(() => Int)
	id: number

	@Field(() => String)
	createdAt: string

	@Field(() => String)
	releaseDate: string

	@Field(() => String)
	name: string

	@Field(() => String)
	image: string

	@Field(() => [Track])
	tracks: Track[]

	@Field(() => Category)
	category: Category

	@Field(() => Int)
	categoryId: true
}
