import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	createdAt: string

	@IsString()
	password: string

	@IsOptional()
	@IsString()
	name: string
}
