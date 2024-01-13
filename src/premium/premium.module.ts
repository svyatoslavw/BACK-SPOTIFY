import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PremiumService } from './premium.service'
import { PremiumResolver } from './premium.resolver'

@Module({
	providers: [PremiumService, PremiumResolver, PrismaService]
})
export class PremiumModule {}
