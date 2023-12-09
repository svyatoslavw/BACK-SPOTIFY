import { Args, Query, Resolver } from '@nestjs/graphql'
import { Track } from './entities/track.entity'
import { TrackService } from './track.service'

@Resolver(() => Track)
export class TrackResolver {
	constructor(private readonly trackService: TrackService) {}

	@Query(() => [Track], { name: 'getAllTracks' })
	tracks() {
		return this.trackService.getAll()
	}

	@Query(() => [Track], { name: 'getHomeTracks' })
	homeTracks() {
		return this.trackService.getHome()
	}

	@Query(() => Track, { name: 'getTrackById' })
	trackById(@Args('id') id: string) {
		return this.trackService.byId(+id)
	}
}
