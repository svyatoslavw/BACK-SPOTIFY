declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string
		DATABASE_URL: string
		JWT_SECRET: string
		REFRESH_TOKEN: string
		SESSION_SECRET: string
		STRIPE_PUBLISHABLE_KEY: string
		STRIPE_SECRET_KEY: string
		STRIPE_WEBHOOK_SECRET
		APP_URL: string
	}
}
