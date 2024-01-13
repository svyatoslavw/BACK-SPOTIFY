import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

@InputType()
export class TrackDto {
	@Field(() => String)
	@IsNotEmpty({message: 'name is required'})
	name: string

	@Field(() => String)
	@IsNotEmpty({message: 'image is required'})
	image: string

	@Field(() => String)
	@IsNotEmpty({message: 'file is required'})
	file: string
}