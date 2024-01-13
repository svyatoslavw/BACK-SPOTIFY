import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MediaResponse {
	@Field(() => String)
	url: string
	@Field(() => String)
	name: string
}
