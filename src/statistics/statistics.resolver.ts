import { Query, Resolver } from '@nestjs/graphql'
import { StatisticsResponse } from './entities/statistics.entitiy'
import { StatisticsService } from './statistics.service'

@Resolver()
export class StatisticsResolver {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Query(() => [StatisticsResponse])
	getMainStatistics() {
		return this.statisticsService.getMainStatistics()
	}
}
