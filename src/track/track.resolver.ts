import { Args, Query, Resolver } from '@nestjs/graphql'
import { SearchInput } from 'src/search/search.input'
import { Track } from './entities/track.entity'
import { TrackService } from './track.service'

@Resolver(() => Track)
export class TrackResolver {
	constructor(private readonly trackService: TrackService) {}

	@Query(() => [Track], { name: 'getAllTracks' })
	tracks(@Args('query') query: SearchInput) {
		return this.trackService.getAll()
	}

	@Query(() => [Track], { name: 'getHomeTracks' })
	homeTracks() {
		return this.trackService.getHome()
	}

	@Query(() => Track, { name: 'getTrackById' })
	getTrackById(@Args('id') id: number) {
		return this.trackService.byId(id)
	}
}
