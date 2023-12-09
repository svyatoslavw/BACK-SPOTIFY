import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class TokensDto {
	@Field(() => String)
	@IsOptional()
	@IsString()
	accessToken?: string

	@Field(() => String)
	@IsOptional()
	@IsString()
	refreshToken?: string
}
