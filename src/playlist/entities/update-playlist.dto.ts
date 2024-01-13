import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdatePlaylistDto {
	@Field(() => String, { nullable: true })
	@IsNotEmpty({ message: 'name is required' })
	name: string

	@Field(() => String, { nullable: true })
	@IsNotEmpty({ message: 'image is required' })
	image: string
}
