import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PlaylistService } from 'src/playlist/playlist.service'
import { Premium } from './entities/premium.entity'

@Resolver(() => Premium)
export class PlaylistResolver {
	constructor(private readonly playlistService: PlaylistService) {}

	@Query(() => [Premium], { name: 'getAllPremium' })
	findAllPlaylists() {
		return this.playlistService.getAll()
	}

	@Query(() => Premium, { name: 'getPlaylistById' })
	findPlaylistById(@Args('id') id: string) {
		return this.playlistService.byId(+id)
	}

	@Query(() => Premium, { name: 'getPlaylistBySlug' })
	findPlaylistBySlug(@Args('slug') slug: string) {
		return this.playlistService.bySlug(slug)
	}

	@Mutation(() => Premium, { name: 'createPlaylist' })
	createPlaylist(@Args('id') userId: number) {
		return this.playlistService.create(userId)
	}

	@Mutation(() => Premium, { name: 'deletePlaylist' })
	deletePlaylist(
		@Args('id') userId: string,
		@Args('playlistId') playlistId: string
	) {
		return this.playlistService.delete(+userId, +playlistId)
	}
}
