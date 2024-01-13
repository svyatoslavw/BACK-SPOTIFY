import { Field, InputType } from '@nestjs/graphql'
import { GraphQLUpload } from 'graphql-upload-ts'

@InputType()
export class MediaInput {
	@Field()
	originalname: string

	@Field(() => GraphQLUpload)
	buffer: Buffer
}
