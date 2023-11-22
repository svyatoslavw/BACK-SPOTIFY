import { Controller, Get, Query } from '@nestjs/common'
import { SearchDto } from './dto/search.dto'
import { SearchService } from './search.service'

@Controller('search')
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get() // Эндпоинт для получения всех треков и альбомов
	async getAll(@Query() query: SearchDto) {
		return this.searchService.getAll(query)
	}
}
