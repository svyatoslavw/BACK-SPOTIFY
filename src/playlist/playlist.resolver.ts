import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Playlist } from './entities/playlist.entity'
import { UpdatePlaylistDto } from './entities/update-playlist.dto'
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

	@Mutation(() => Playlist)
	addToPlaylist(@Args('id') id: number, @Args('trackId') trackId: number) {
		return this.playlistService.addToPlaylist(id, trackId)
	}

	@Auth()
	@Mutation(() => Playlist, { name: 'createPlaylist' })
	createPlaylist(@Args('id') userId: number) {
		return this.playlistService.create(userId)
	}
	@Mutation(() => Playlist, { name: 'updatePlaylist', nullable: true })
	updatePlaylist(@Args('id') id: number, @Args('dto') dto: UpdatePlaylistDto) {
		return this.playlistService.update(id, dto)
	}
	@Mutation(() => String, { name: 'deletePlaylist', nullable: true })
	deletePlaylist(
		@Args('id') id: number,
		@Args('playlistId') playlistId: number
	) {
		return this.playlistService.delete(id, playlistId)
	}
}
