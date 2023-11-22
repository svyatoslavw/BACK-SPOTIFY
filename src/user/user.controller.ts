import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getById(@CurrentUser('id') id: string) {
		return this.userService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('profile/favorites/:playlistId')
	async toggleFavorite(
		@Param('playlistId') playlistId: string,
		@CurrentUser('id') id: number
	) {
		return this.userService.toggleFavorite(id, +playlistId)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id)
	}
}
