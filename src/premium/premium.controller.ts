import {
	Controller,
	Get,
	HttpCode,
	Param,
	Res,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Args } from '@nestjs/graphql'
import { Response } from 'express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { PremiumService } from './premium.service'

@Controller('premium')
export class PremiumController {
	constructor(private readonly premiumService: PremiumService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Get('create/:type')
	async create(@Param('type') type: UserPremiumType, @Args('id') id: number) {
		return this.premiumService.create(type, id)
	}

	@UsePipes(new ValidationPipe())
	@Get('success/session')
	async success(@Res() res: Response) {
		return this.premiumService.successSession(res)
	}
}
