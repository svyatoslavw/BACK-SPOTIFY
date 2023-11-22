import { IsOptional, IsString } from 'class-validator'

export class SearchDto {
	@IsOptional()
	@IsString()
	searchTerm?: string

	@IsOptional()
	@IsString()
	categoryId?: string
}
