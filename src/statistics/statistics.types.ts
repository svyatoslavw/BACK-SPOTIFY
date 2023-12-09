import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StatisticsResponse {
	@Field(() => String)
	name: string

	@Field(() => Number)
	value: number
}
