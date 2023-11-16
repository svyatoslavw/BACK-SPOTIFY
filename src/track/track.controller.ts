import {
	Controller,
	Get,
	Param,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TrackService } from './track.service'

@Controller('tracks')
export class TrackController {
	constructor(private readonly trackService: TrackService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.trackService.getAll()
	}

	@Get(':id')
	async ById(@Param('id') id: string) {
		return this.trackService.byId(+id)
	}
}
