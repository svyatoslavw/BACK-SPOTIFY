declare namespace NodeJS {
	export interface ProcessEnv {
		DATABASE_URL: string
		JWT_SECRET: string
		REFRESH_TOKEN: string
		SESSION_SECRET: string
	}
}
