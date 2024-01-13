import { Module } from '@nestjs/common'
import { AlbumService } from 'src/album/album.service'
import { PrismaService } from 'src/prisma.service'
import { TrackResolver } from './track.resolver'
import { TrackService } from './track.service'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	providers: [TrackService, TrackResolver, PrismaService, AlbumService, UserService, JwtService]
})
export class TrackModule {}
