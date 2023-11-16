import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	name: string

	@MinLength(5, {
		message: 'Пароль должен содержать минимум 6 символов'
	})
	@IsString()
	password: string
}

export class AuthGoogleDto {
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	name: string
}
