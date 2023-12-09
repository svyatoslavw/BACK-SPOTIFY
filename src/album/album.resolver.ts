import { Query, Resolver } from '@nestjs/graphql'
import { AlbumService } from './album.service'
import { Album } from './entities/album.entity'

@Resolver(() => Album)
export class AlbumResolver {
	constructor(private readonly albumService: AlbumService) {}

	@Query(() => [Album], { name: 'getAllAlbum' })
	findAll() {
		return this.albumService.getAll()
	}
}
