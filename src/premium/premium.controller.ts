import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Res,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PremiumService } from './premium.service'

@Controller('premium')
export class PremiumController {
	constructor(private readonly premiumService: PremiumService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('USER')
	@Post('create')
	async create(
		@Body('type') type: UserPremiumType,
		@CurrentUser('id') id: number
	) {
		return this.premiumService.create(type, id)
	}

	@UsePipes(new ValidationPipe())
	@Get('success/session')
	async success(@Res() res: Response) {
		return this.premiumService.successSession(res)
	}
}
