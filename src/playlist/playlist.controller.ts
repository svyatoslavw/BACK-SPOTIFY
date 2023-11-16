import {
	Controller,
	Get,
	Param,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PlaylistService } from './playlist.service'

@Controller('playlists')
export class PlaylistController {
	constructor(private readonly playlistService: PlaylistService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.playlistService.getAll()
	}

	@Get(':id')
	async ById(@Param('id') id: string) {
		return this.playlistService.byId(+id)
	}
	@Get('by-slug/:slug')
	async BySlug(@Param('slug') slug: string) {
		return this.playlistService.bySlug(slug)
	}
}
