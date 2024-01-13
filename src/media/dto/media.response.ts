import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MediaResponse {
	@Field()
	url: string

	@Field()
	name: string
}
