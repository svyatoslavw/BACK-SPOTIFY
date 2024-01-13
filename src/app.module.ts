import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { join } from 'path'
import { AlbumModule } from './album/album.module'
import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/strategy/jwt.strategy'
import { CategoryModule } from './category/category.module'
import { getJwtConfig } from './config/jwt.config'
import { MediaModule } from './media/media.module'
import { PlaylistModule } from './playlist/playlist.module'
import { PremiumModule } from './premium/premium.module'
import { PrismaService } from './prisma.service'
import { SearchModule } from './search/search.module'
import { StatisticsModule } from './statistics/statistics.module'
import { TrackModule } from './track/track.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			playground: true,
			context: ({ req, res }) => ({ req, res })
		}),
		UserModule,
		AuthModule,
		TrackModule,
		AlbumModule,
		PlaylistModule,
		MediaModule,
		SearchModule,
		StatisticsModule,
		PremiumModule,
		CategoryModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [],
	providers: [PrismaService, JwtStrategy]
})
export class AppModule {}
