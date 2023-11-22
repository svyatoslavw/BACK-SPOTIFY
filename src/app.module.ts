import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { AlbumModule } from './album/album.module'
import { AuthModule } from './auth/auth.module'
import { MediaModule } from './media/media.module'
import { PlaylistModule } from './playlist/playlist.module'
import { PrismaService } from './prisma.service'
import { TrackModule } from './track/track.module'
import { UserModule } from './user/user.module'
import { SearchModule } from './search/search.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		UserModule,
		AuthModule,
		PassportModule.register({ session: true }),
		TrackModule,
		AlbumModule,
		PlaylistModule,
		MediaModule,
		SearchModule
	],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
