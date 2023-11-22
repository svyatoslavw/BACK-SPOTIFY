import { Module } from '@nestjs/common'
import { AlbumService } from 'src/album/album.service'
import { PrismaService } from 'src/prisma.service'
import { TrackController } from './track.controller'
import { TrackService } from './track.service'

@Module({
	controllers: [TrackController],
	providers: [TrackService, PrismaService, AlbumService]
})
export class TrackModule {}
