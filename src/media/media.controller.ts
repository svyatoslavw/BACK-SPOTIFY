import {
	Controller,
	HttpCode,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	@UseInterceptors(FileInterceptor('media'))
	async uploadMediaFile(@UploadedFile() mediaFile: Express.Multer.File) {
		return this.mediaService.saveMediaFiles(mediaFile)
	}
}
