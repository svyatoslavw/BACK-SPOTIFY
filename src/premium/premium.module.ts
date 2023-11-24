import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PremiumController } from './premium.controller'
import { PremiumService } from './premium.service'

@Module({
	controllers: [PremiumController],
	providers: [PremiumService, PrismaService]
})
export class PremiumModule {}
