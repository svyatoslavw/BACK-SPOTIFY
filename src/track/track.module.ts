import { Module } from '@nestjs/common'
import { AlbumService } from 'src/album/album.service'
import { PrismaService } from 'src/prisma.service'
import { TrackResolver } from './track.resolver'
import { TrackService } from './track.service'

@Module({
	providers: [TrackService, TrackResolver, PrismaService, AlbumService]
})
export class TrackModule {}
