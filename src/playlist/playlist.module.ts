import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { PlaylistResolver } from './playlist.resolver'
import { PlaylistService } from './playlist.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	providers: [PlaylistService, PlaylistResolver, PrismaService, UserService, JwtService]
})
export class PlaylistModule {}
