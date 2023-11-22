import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common'
import { AlbumService } from './album.service'

@Controller('albums')
export class AlbumController {
	constructor(private readonly albumService: AlbumService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.albumService.getAll()
	}
}
