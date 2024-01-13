import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Album } from 'src/album/entities/album.entity'
import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entities/user.entity'

@ObjectType()
export class Track {
	@Field(() => Int)
	id: number

	@Field(() => String)
	createdAt: string

	@Field(() => String)
	releaseDate: string

	@Field(() => String)
	file: string

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	image: string

	@Field(() => Int)
	artistId: number

	@Field(() => User)
	artist: User

	@Field(() => String)
	album: string

	@Field(() => [Album])
	albumId: Album[]

	@Field(() => Category)
	category: Category

	@Field(() => Int)
	categoryId: number
}
