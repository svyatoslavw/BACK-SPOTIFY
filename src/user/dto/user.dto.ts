import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString } from 'class-validator'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'

@InputType()
export class UserDto {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsEmail()
	email?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString()
	password?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString()
	name?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	image: string
}
