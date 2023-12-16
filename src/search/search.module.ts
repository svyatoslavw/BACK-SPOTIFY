import { Module } from '@nestjs/common'
import { AlbumService } from 'src/album/album.service'
import { PrismaService } from 'src/prisma.service'
import { TrackService } from 'src/track/track.service'
import { SearchResolver } from './search.resolver'
import { SearchService } from './search.service'

@Module({
	providers: [
		SearchService,
		PrismaService,
		SearchResolver,
		AlbumService,
		TrackService
	]
})
export class SearchModule {}
