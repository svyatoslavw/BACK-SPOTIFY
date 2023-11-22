import { Module } from '@nestjs/common'
import { AlbumService } from 'src/album/album.service'
import { PrismaService } from 'src/prisma.service'
import { TrackService } from 'src/track/track.service'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
	controllers: [SearchController],
	providers: [SearchService, PrismaService, AlbumService, TrackService]
})
export class SearchModule {}
