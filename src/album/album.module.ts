import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AlbumResolver } from './album.resolver'
import { AlbumService } from './album.service'

@Module({
	providers: [AlbumService, AlbumResolver, PrismaService]
})
export class AlbumModule {}
