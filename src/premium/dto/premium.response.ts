import { Field, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@ObjectType()
export class PremiumResponse {
	@Field(() => String)
	@IsString()
	url: string
}
