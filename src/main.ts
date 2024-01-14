import { NestFactory } from '@nestjs/core'
import * as cors from 'cors'
import * as session from 'express-session'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import * as passport from 'passport'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'

async function bootstrap() {
	const PORT = process.env.PORT || 4000
	const app = await NestFactory.create(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.use(graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }))

	app.use(
		cors({
			origin: 'http://localhost:3000',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
			allowedHeaders: [
				'Content-Type',
				'Authorization',
				'Access-Control-Allow-Headers',
				'apollo-require-preflight',
				'X-Requested-With',
				'Accept'
			],
			credentials: true
		})
	)

	app.use(
		session({
			name: 'session.id',
			secret: process.env.SESSION_SECRET,
			saveUninitialized: false,
			resave: false,
			cookie: {
				maxAge: 60000
			}
		})
	)

	app.use(passport.initialize())
	app.use(passport.session())

	app.enableCors({
		origin: true
	})

	await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap()
