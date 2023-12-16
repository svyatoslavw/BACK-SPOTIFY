import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class SearchInput {
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	searchTerm?: string

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	categoryId?: string
}
