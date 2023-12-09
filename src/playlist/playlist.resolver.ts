import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Playlist } from './entities/playlist.entity'
import { PlaylistService } from './playlist.service'

@Resolver(() => Playlist)
export class PlaylistResolver {
	constructor(private readonly playlistService: PlaylistService) {}

	@Query(() => [Playlist], { name: 'getAllPlaylist' })
	findAllPlaylists() {
		return this.playlistService.getAll()
	}

	@Query(() => Playlist, { name: 'getPlaylistById' })
	findPlaylistById(@Args('id') id: string) {
		return this.playlistService.byId(+id)
	}

	@Query(() => Playlist, { name: 'getPlaylistBySlug' })
	findPlaylistBySlug(@Args('slug') slug: string) {
		return this.playlistService.bySlug(slug)
	}

	@Mutation(() => Playlist, { name: 'createPlaylist' })
	createPlaylist(@Args('id') userId: number) {
		return this.playlistService.create(userId)
	}

	@Mutation(() => Playlist, { name: 'deletePlaylist' })
	deletePlaylist(
		@Args('id') userId: string,
		@Args('playlistId') playlistId: string
	) {
		return this.playlistService.delete(+userId, +playlistId)
	}
}
