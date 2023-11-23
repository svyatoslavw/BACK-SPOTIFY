import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
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

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: number) {
		return this.playlistService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Delete(':playlistId')
	async delete(
		@CurrentUser('id') userId: string,
		@Param('playlistId') playlistId: string
	) {
		return this.playlistService.delete(+userId, +playlistId)
	}
}
