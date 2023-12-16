import { Field, ObjectType } from '@nestjs/graphql'
import { Album } from 'src/album/entities/album.entity'
import { Track } from 'src/track/entities/track.entity'

@ObjectType()
export class SearchResult {
	@Field(() => [Track])
	tracks: Track[]

	@Field(() => [Album])
	albums: Album[]
}
