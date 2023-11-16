import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SessionSerializer } from './serializers/session.serialize'
import { GithubStrategy } from './strategy/github.strategy'
import { GoogleStrategy } from './strategy/google.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule,
		CacheModule.register()
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		PrismaService,
		JwtStrategy,
		GoogleStrategy,
		GithubStrategy,
		SessionSerializer
	]
})
export class AuthModule {}
