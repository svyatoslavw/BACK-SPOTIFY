import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { MediaResolver } from './media.resolver'
import { MediaService } from './media.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	providers: [MediaService, MediaResolver, PrismaService, UserService, JwtService]
})
export class MediaModule {}
