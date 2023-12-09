import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { StatisticsResolver } from './statistics.resolver'
import { StatisticsService } from './statistics.service'

@Module({
	providers: [StatisticsService, StatisticsResolver, UserService, PrismaService]
})
export class StatisticsModule {}
