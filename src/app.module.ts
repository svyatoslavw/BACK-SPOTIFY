import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { join } from 'path'
import { AlbumModule } from './album/album.module'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
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
			context: ({ req }) => ({ req })
		}),
		// GraphQLModule.forRootAsync({
		// 	useFactory: async () => ({
		// 		driver: ApolloDriver,
		// 		autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		// 		playground: true,
		// 		context: ({ req }) => ({ req }),
		// 		guards: [JwtGuard, RolesGuard, RefreshJwtGuard]
		// 	})
		// }),
		UserModule,
		AuthModule,
		PassportModule.register({ session: true }),
		TrackModule,
		AlbumModule,
		PlaylistModule,
		MediaModule,
		SearchModule,
		StatisticsModule,
		PremiumModule,
		CategoryModule
	],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
