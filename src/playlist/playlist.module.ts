import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { PlaylistController } from './playlist.controller'
import { PlaylistService } from './playlist.service'

@Module({
	controllers: [PlaylistController],
	providers: [PlaylistService, PrismaService, UserService]
})
export class PlaylistModule {}
