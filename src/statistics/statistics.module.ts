import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { StatisticsResolver } from './statistics.resolver'
import { StatisticsService } from './statistics.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	providers: [StatisticsService, StatisticsResolver, UserService, PrismaService, JwtService]
})
export class StatisticsModule {}
