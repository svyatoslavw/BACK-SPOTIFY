import { Injectable } from '@nestjs/common'
import { AlbumService } from 'src/album/album.service'
import { TrackService } from 'src/track/track.service'
import { SearchDto } from './dto/search.dto'

@Injectable()
export class SearchService {
	constructor(
		private readonly trackService: TrackService,
		private readonly albumService: AlbumService
	) {}

	async getAll(dto: SearchDto = {}) {
		const tracks = await this.trackService.getAll(dto)
		const albums = await this.albumService.getAll(dto)

		return {
			tracks,
			albums
		}
	}
}
