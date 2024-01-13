import { Module } from '@nestjs/common'
import { MediaService } from 'src/media/media.service'
import { PrismaService } from 'src/prisma.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	providers: [UserService, UserResolver, PrismaService, MediaService, JwtService],
	exports: [UserService]
})
export class UserModule {}
