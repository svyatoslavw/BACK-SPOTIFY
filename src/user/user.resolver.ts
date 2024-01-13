import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from 'src/auth/decorators/auth.decorator'
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
	@Auth('ADMIN')
	profile(@Args('id') id: number) {
		return this.userService.byId(id)
	}

	@Query(() => User, { name: 'getProfileByToken' })
	async getProfileByToken(@Context() { req }) {
		const token = req.headers.authorization?.replace('Bearer ', '')
		if (!token) {
			throw new Error('Token not provided')
		}
		return this.userService.getProfileByToken(token)
	}

	@Mutation(() => User, { name: 'updateProfile' })
	async updateProfile(
		@Args('id') id: number,
		@Args('dto') dto: UserDto
		// @Args('file', { type: () => GraphQLUpload, nullable: true })
		// file: GraphQLUpload.FileUpload
	) {
		return this.userService.updateProfile(id, dto)
	}

	@Mutation(() => User, { name: 'toggleFavorite' })
	async toggleFavorite(
		@Args('playlistId') playlistId: string,
		@Args('id') id: number
	) {
		return this.userService.toggleFavorite(id, +playlistId)
	}

	@Mutation(() => User, { name: 'toggleFavoriteTrack' })
	async toggleFavoriteTrack(
		@Args('id') id: number,
		@Args('trackId') trackId: number
	) {
		return this.userService.toggleFavoriteTrack(id, trackId)
	}

	@Mutation(() => User, { name: 'deleteProfile' })
	async deleteProfile(@Args('id') id: number) {
		return this.userService.remove(id)
	}
}
