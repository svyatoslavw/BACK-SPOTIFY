import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User], { name: 'getAllUsers' })
	getAllUsers() {
		return this.userService.getAll()
	}

	@Query(() => User, { name: 'getProfile' })
	profile(@Args('id') id: number) {
		return this.userService.byId(id)
	}

	@Mutation(() => User, { name: 'updateProfile' })
	async updateProfile(@Args('id') id: number, @Args('dto') dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Mutation(() => User, { name: 'toggleFavorite' })
	async toggleFavorite(
		@Args('playlistId') playlistId: string,
		@Args('id') id: number
	) {
		return this.userService.toggleFavorite(id, +playlistId)
	}

	@Mutation(() => User, { name: 'deleteProfile' })
	async removeUser(@Args('id') id: string) {
		return this.userService.remove(+id)
	}
}
