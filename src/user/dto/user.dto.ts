import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString } from 'class-validator'

@InputType()
export class UserDto {
	@Field(() => String)
	@IsOptional()
	@IsEmail()
	email?: string

	@Field(() => String)
	@IsOptional()
	@IsString()
	password?: string

	@Field(() => String)
	@IsOptional()
	@IsString()
	name?: string

	@Field(() => String)
	@IsOptional()
	@IsString()
	image?: string
}
