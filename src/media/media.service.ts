import { BadRequestException, Injectable } from '@nestjs/common'
import { createWriteStream } from 'fs'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { UserService } from 'src/user/user.service'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class MediaService {
	constructor(private userService: UserService) {}

	async saveMediaFiles(
		file: GraphQLUpload.FileUpload
	): Promise<{ url: string; name: string }> {
		try {
			const { createReadStream, filename } = await file
			const uniqueFilename = `${uuidv4()}_${filename}`
			const uploadFolder = 'uploads'
			const imagePath = `${uploadFolder}/${uniqueFilename}`
			const imageUrl = `/${imagePath}`
			const readStream = createReadStream()

			const writeStream = createWriteStream(imagePath)
			readStream.pipe(writeStream)

			await new Promise((resolve, reject) => {
				writeStream.on('finish', resolve)
				writeStream.on('error', reject)
			})

			return {
				url: imageUrl,
				name: uniqueFilename
			}
		} catch (error) {
			throw new BadRequestException('Failed to save media files')
		}
	}
}
