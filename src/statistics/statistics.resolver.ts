import { Query, Resolver } from '@nestjs/graphql'
import { StatisticsService } from './statistics.service'
import { StatisticsResponse } from './statistics.types'

@Resolver()
export class StatisticsResolver {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Query(() => [StatisticsResponse], { name: 'getMainStatistics' })
	getMainStatistics() {
		return this.statisticsService.getMainStatistics()
	}
}
