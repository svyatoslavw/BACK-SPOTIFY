import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

@InputType()
export class AuthDto {
	@Field(() => String)
	@IsNotEmpty({ message: 'email is required' })
	@IsEmail()
	email: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsNotEmpty({ message: 'name is required' })
	@IsString()
	name: string

	@Field(() => String)
	@MinLength(5, {
		message: 'Password nust be at loast 6 characters'
	})
	@IsNotEmpty({ message: 'password is required' })
	@IsString()
	password: string
}

@InputType()
export class AuthGoogleDto {
	@Field(() => String)
	@IsNotEmpty({ message: 'email is required' })
	@IsEmail()
	email: string

	@Field(() => String)
	@IsNotEmpty({ message: 'name is required' })
	@IsString()
	name: string
}
