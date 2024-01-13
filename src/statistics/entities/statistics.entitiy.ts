import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StatisticsResponse {
	@Field(() => String, {nullable: true})
	name: string

	@Field(() => Number, {nullable: true})
	value: number
}
