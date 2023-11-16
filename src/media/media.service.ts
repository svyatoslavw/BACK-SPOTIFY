import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { IMediaResponse } from './media.interface'

@Injectable()
export class MediaService {
	async saveMediaFiles(
		mediaFile: Express.Multer.File
	): Promise<IMediaResponse> {
		const uploadFolder = `${path}/uploads/`
		await ensureDir(uploadFolder)

		await writeFile(
			`${uploadFolder}/${mediaFile.originalname}`,
			mediaFile.buffer
		)

		return {
			url: `/uploads/${mediaFile.originalname}`,
			name: mediaFile.originalname
		}
	}
}
