import { Args, Mutation, Resolver } from '@nestjs/graphql'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { MediaResponse } from './entities/media.entity'
import { MediaService } from './media.service'
@Resolver()
export class MediaResolver {
	constructor(private readonly mediaService: MediaService) {}

	@Mutation(() => MediaResponse)
	async uploadMediaFile(
		@Args('file', { type: () => GraphQLUpload, nullable: true })
		file: GraphQLUpload.FileUpload
	) {
		console.log(file)
		return this.mediaService.saveMediaFiles(file)
	}
}
