import { Args, Query, Resolver } from '@nestjs/graphql'
import { SearchResult } from './entities/search.entity'
import { SearchInput } from './search.input'
import { SearchService } from './search.service'

@Resolver()
export class SearchResolver {
	constructor(private readonly searchService: SearchService) {}

	@Query(() => SearchResult)
	async getSearchQuery(@Args('query') query: SearchInput) {
		return this.searchService.getAll(query)
	}
}
